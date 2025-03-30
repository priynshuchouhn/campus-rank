'use server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLeaderboard() {
    const leaderboard = await prisma.leaderboardStats.findMany({ orderBy: {globalRank: "asc"}, include: {user: true} });
    return leaderboard;
}