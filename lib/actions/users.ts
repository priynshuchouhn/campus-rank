'use server';
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces";
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
        const overallScore = (leetcodeScore + hackerrankScore + gfgScore) / 3;

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
        console.error('Error fetching and updating profile:', error);
        // Don't throw the error to prevent blocking the user update
    }

}

export async function getUser() {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User not found");
    }
    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    revalidatePath('/profile', 'page');
    return user;
}

export async function updateUser(values: User) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User not found");
    }
    const user = await prisma.user.update({
        where: { email: email },
        data: values,
    });
    
    // Fetch profile and update leaderboard in the background
    fetchAndUpdateProfile(user).catch(console.error);
    revalidatePath('/profile', 'page');
    return user;
}   