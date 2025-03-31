'use server';

import { prisma } from "../prisma";


export async function getLeaderboard() {
    try {
        const leaderboard = await prisma.leaderboardStats.findMany({
            orderBy: { globalRank: "asc" },
            include: {
                user: {
                    include: {
                        gfgProfile: true,
                        hackerrankProfile: {
                            include: {
                                badges: true
                            }
                        },
                        leetcodeProfile: true
                    }
                }
            }
        });
        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

export async function updateApplicationStats() {
    try {
        const applicationStats = await prisma.applicationStats.findFirst();
        const profileViews = await prisma.profileView.findMany();
        const totalProfileViews = profileViews.length;
        const totalSolved = await prisma.user.aggregate({
        _sum: {
            totalSolved: true
        }
    });
    if (!applicationStats) {
        await prisma.applicationStats.create({
            data: {
                lastLeaderboardUpdate: new Date(),
                totalProfileViews,
                totalQuestionsSolved: totalSolved._sum.totalSolved ?? 0,
                profileViewsSinceLastUpdate: 0,
                questionsSolvedSinceLastUpdate: 0,
            },
        });
        return;
    }
    const profileViewsSinceLastUpdate = profileViews.filter(view => view.createdAt > applicationStats.lastLeaderboardUpdate).length;
    const questionsSolvedSinceLastUpdate = totalSolved._sum.totalSolved ?? 0 - applicationStats.totalQuestionsSolved; // Fixed the property access
    await prisma.applicationStats.update({
        where: { id: applicationStats.id },
        data: {
            lastLeaderboardUpdate: new Date(),
            totalProfileViews,
                totalQuestionsSolved: totalSolved._sum.totalSolved ?? 0, // Added totalQuestionsSolved initialization
                profileViewsSinceLastUpdate,
                questionsSolvedSinceLastUpdate
            },
        });
    } catch (error) {
        console.error('Error updating application stats:', error);
    }
}
