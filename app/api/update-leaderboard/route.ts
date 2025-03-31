import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { fetchAndUpdateProfile } from "@/lib/actions/users";

const prisma = new PrismaClient();


async function updateGlobalRanks() {
    // Get all leaderboard stats ordered by overall score
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
}

export async function GET() {
    try {
        // Get all users
        const users = await prisma.user.findMany();

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

        // Revalidate the leaderboard page
        revalidatePath('/', 'page');

        return NextResponse.json({ 
            success: true, 
            message: 'Leaderboard updated successfully',
            leaderboard 
        });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update leaderboard' },
            { status: 500 }
        );
    }
}
