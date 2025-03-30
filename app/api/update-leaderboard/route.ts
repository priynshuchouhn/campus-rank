import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

interface LeetCodeSubmission {
    difficulty: string;
    count: number;
    submissions: number;
}

interface HackerRankBadge {
    name: string;
    stars: string;
}

async function fetchAndUpdateProfile(user: User) {
    try {
        // Call the fetch-profile API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                leetcodeUsername: user.leetcodeUsername,
                hackerrankUsername: user.hackerrankUsername,
                gfgUsername: user.gfgUsername,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }

        const profileData = await response.json();
        
        // Calculate scores based on fetched data
        let leetcodeScore = 0;
        if (profileData.leetcode?.submitStats?.acSubmissionNum) {
            const stats = profileData.leetcode.submitStats.acSubmissionNum as LeetCodeSubmission[];
            leetcodeScore = stats.reduce((acc: number, curr: LeetCodeSubmission) => {
                const weight = curr.difficulty === 'Easy' ? 1 : curr.difficulty === 'Medium' ? 2 : 3;
                return acc + (curr.count * weight);
            }, 0);
        }

        let hackerrankScore = 0;
        if (profileData.hackerrank?.badges) {
            // Calculate score based on badges
            const badges = profileData.hackerrank.badges as HackerRankBadge[];
            hackerrankScore = badges.reduce((acc: number, badge: HackerRankBadge) => {
                return acc + (parseInt(badge.stars) || 0);
            }, 0);
        }

        let gfgScore = 0;
        if (profileData.gfg?.codingScore) {
            gfgScore = parseFloat(profileData.gfg.codingScore) || 0;
        }

        // Calculate overall score (weighted average)
        const overallScore = (leetcodeScore * 0.5) + (hackerrankScore * 0.3) + (gfgScore * 0.2);

        // Update leaderboard stats
        await prisma.leaderboardStats.upsert({
            where: { userId: user.id },
            update: {
                overallScore,
                leetcodeScore,
                hackerrankScore,
                gfgScore,
            },
            create: {
                userId: user.id,
                overallScore,
                leetcodeScore,
                hackerrankScore,
                gfgScore,
            },
        });

        // Update user's solved problems count
        if (profileData.leetcode?.submitStats?.acSubmissionNum) {
            const stats = profileData.leetcode.submitStats.acSubmissionNum as LeetCodeSubmission[];
            const totalSolved = stats.reduce((acc: number, curr: LeetCodeSubmission) => acc + curr.count, 0);
            const easySolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Easy')?.count || 0;
            const mediumSolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Medium')?.count || 0;
            const hardSolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Hard')?.count || 0;

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    totalSolved,
                    easySolved,
                    mediumSolved,
                    hardSolved,
                    lastLeetcodeFetch: new Date(),
                },
            });
        }
    } catch (error) {
        console.error(`Error fetching and updating profile for user ${user.email}:`, error);
    }
}

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
