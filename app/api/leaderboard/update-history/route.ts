import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const CRON_SECRET = process.env.CRON_SECRET_TOKEN!


export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization')

    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    try {
        // Step 1: Get current leaderboard sorted by rank (assuming lower score = better rank)
        const leaderboards = await prisma.leaderboardStats.findMany({
            orderBy: { globalRank: 'asc' }, // or whatever metric you're ranking by
            select: {
                id: true,
                user: true,
                globalRank: true
            },
        })

        // Step 2: Map users to ranks
        const currentRanks = leaderboards.map((leaderboard, index) => ({
            userId: leaderboard.user.id,
            rank: leaderboard.globalRank,
        }))

        // Step 3: Loop through users and find their previous rank
        for (const user of currentRanks) {
            const previous = await prisma.leaderboardHistory.findFirst({
                where: { userId: user.userId },
                orderBy: { snapshotAt: 'desc' },
            })

            const rankChange = previous
                ? previous.rank - (user.rank || 0) // Positive if rank improved (e.g., from 5 to 3 = +2)
                : 0

            await prisma.leaderboardHistory.create({
                data: {
                    userId: user.userId,
                    rank: user.rank ?? 0,
                    rankChange,
                    snapshotAt: new Date()
                },
            })
        }

        return NextResponse.json({ success: true, message: 'Leaderboard history updated.' })
    } catch (error) {
        console.error('[UPDATE_LEADERBOARD_HISTORY]', error)
        return NextResponse.json({ success: false, message: 'Error updating leaderboard history.' }, { status: 500 })
    }
}
