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
        await prisma.errorLog.create({
            data: {
                errorAt: '[leaderboard.ts] getLeaderboard',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
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
        console.log('Total profile views:', totalProfileViews);
        console.log('Total questions solved:', totalSolved._sum.totalSolved);
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

        // Calculate views since last update
        const viewsSinceLastUpdate = profileViews.filter(view => view.createdAt > applicationStats.lastLeaderboardUpdate).length;
        console.log('Views since last update:', viewsSinceLastUpdate);
        const profileViewsSinceLastUpdate = viewsSinceLastUpdate;

        // Calculate questions solved since last update
        const currentTotalSolved = totalSolved._sum.totalSolved ?? 0;
        const questionsSolvedSinceLastUpdate = Math.max(0, currentTotalSolved - applicationStats.totalQuestionsSolved);
        console.log('Questions solved since last update:', questionsSolvedSinceLastUpdate);

       const updatedStats = await prisma.applicationStats.update({
            where: { id: applicationStats.id },
            data: {
                lastLeaderboardUpdate: new Date(),
                totalProfileViews,
                totalQuestionsSolved: currentTotalSolved,
                profileViewsSinceLastUpdate,
                questionsSolvedSinceLastUpdate
            },
        });
        console.log('Updated application stats:', updatedStats);
        return updatedStats;
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: '[leaderboard.ts] updateApplicationStats',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        console.error('Error updating application stats:', error);
    }
}
