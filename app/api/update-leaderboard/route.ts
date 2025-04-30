import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fetchAndUpdateProfile } from "@/lib/actions/users";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { updateApplicationStats } from "@/lib/actions/leaderboard";
import { sendLeaderboardUpdateNotification } from "@/lib/notifications";

async function updateGlobalRanks() {
    // Get all leaderboard stats ordered by overall score
    try {
        const leaderboardStats = await prisma.leaderboardStats.findMany({
            orderBy: {
                overallScore: 'desc'
            }
        });

    // Update global ranks
    for (let i = 0; i < leaderboardStats.length; i++) {
        await prisma.leaderboardStats.update({
            where: { id: leaderboardStats[i].id },
                data: { globalRank: i + 1 }
            });
        }
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: 'updateGlobalRanks - update-leaderboard/route.ts',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        console.error('Error updating global ranks:', error);
    }
}

export async function GET() {
    try {
        // Get all users
        const users = await prisma.user.findMany({
            where: {
                role: "USER",
                isActive: true,
            }
        });

        // Fetch and update profiles for all users
        const updatePromises = users.map(user => fetchAndUpdateProfile(user));
        await Promise.all(updatePromises);

        // Update global ranks
        await updateGlobalRanks();

        // Get the updated leaderboard
        const leaderboard = await prisma.leaderboardStats.findMany({
            orderBy: { globalRank: 'asc' },
            include: { user: true }
        });

        // Send email notifications
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/email/leaderboard`);
        
        // Update application stats
        await updateApplicationStats();

        // Send push notifications
        await sendLeaderboardUpdateNotification();

        // Revalidate the leaderboard page
        revalidatePath('/', 'page');

        return NextResponse.json({ 
            success: true, 
            message: 'Leaderboard updated successfully',
            leaderboard 
        });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        await prisma.errorLog.create({
            data: {
                errorAt: '[API] update-leaderboard/route.ts',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        return NextResponse.json(
            { success: false, message: 'Failed to update leaderboard' },
            { status: 500 }
        );
    }
}
