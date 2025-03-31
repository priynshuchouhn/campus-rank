'use server';

import { prisma } from "../prisma";


export async function getLeaderboard() {
    try {
        const leaderboard = await prisma.leaderboardStats.findMany({ 
            orderBy: {globalRank: "asc"}, 
            include: {user: {
            include: {
                gfgProfile: true,
                hackerrankProfile: {
                    include: {
                        badges: true
                    }
                },
                leetcodeProfile: true
            }
        }}
    });
    return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}