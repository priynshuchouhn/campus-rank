'use server';
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { headers } from "next/headers";
import axios from 'axios';

// Helper function to create delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface LeetCodeSubmission {
    difficulty: string;
    count: number;
    submissions: number;
}

interface HackerRankBadge {
    name: string;
    stars: string;
}


export async function fetchAndUpdateProfile(user: any) {
    try {
        // Add a 2-second delay for each user to prevent rate limiting
        await sleep(2000);
        
        // Call the fetch-profile API endpoint using axios
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch-profile`, {
            leetcodeUsername: user.leetcodeUsername,
            hackerrankUsername: user.hackerrankUsername,
            gfgUsername: user.gfgUsername,
            userId: user.id,
        });

        if (!response.data) {
            throw new Error('Failed to fetch profiles');
        }

        const profileData = response.data;

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
            // Calculate score based on stars per skill
            hackerrankScore = badges.reduce((acc: number, badge: HackerRankBadge) => {
                const stars = parseInt(badge.stars) || 0;
                // 5 stars = 100 points, 4 stars = 80 points, 3 stars = 60 points, 2 stars = 40 points, 1 star = 20 points
                return acc + (stars * 20);
            }, 0);
        }

        let gfgScore = 0;
        let gfgSolved = 0;
        if (profileData.gfg?.codingScore) {
            gfgScore = parseFloat(profileData.gfg.codingScore) || 0;
            gfgSolved = profileData.gfg.solvedProblems || 0;
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

        let totalSolved = isNaN(parseInt(`${gfgSolved}`, 10)) ? 0 : parseInt(`${gfgSolved}`, 10);
        // Update user's solved problems count
        if (profileData.leetcode?.submitStats?.acSubmissionNum) {
            const stats = profileData.leetcode.submitStats.acSubmissionNum as LeetCodeSubmission[];
            const easySolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Easy')?.count || 0;
            const mediumSolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Medium')?.count || 0;
            const hardSolved = stats.find((s: LeetCodeSubmission) => s.difficulty === 'Hard')?.count || 0;
            totalSolved += stats.find((s: LeetCodeSubmission) => s.difficulty === 'All')?.count || 0;

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    totalSolved,
                    easySolved,
                    mediumSolved,
                    hardSolved,
                    lastLeetcodeFetch: new Date(),
                    lastGfgFetch: new Date(),
                    lastHackerrankFetch: new Date(),
                },
            });
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    lastLeetcodeFetch: new Date(),
                    totalSolved,
                    lastGfgFetch: new Date(),
                    lastHackerrankFetch: new Date(),
                },
            });
        }
        console.log(`Profile updated for user ${user.email}`);
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: '[users.ts] fetchAndUpdateProfile',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        console.error(`Error fetching and updating profile for user ${user.email}:`, error);
    }
}

export async function getUser() {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        return null;
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
            leetcodeProfile: true,
            hackerrankProfile: {
                include: {
                    badges: true
                }
            },
            gfgProfile: true,
            leaderboardStats: true,
            profileView: true,
        }
    });
    return user;
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: '[users.ts] getUser',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        return null;
    }
}   

export async function updateUser(values: any) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User not found");
    }
    // Extract usernames from URLs if needed
    const leetcodeUsername = values.leetcodeUsername?.trim()?.includes('leetcode.com')
        ? values.leetcodeUsername.trim().split(/[\/u\/|\/]/).filter(Boolean).pop()
        : values.leetcodeUsername?.trim();

    const hackerrankUsername = values.hackerrankUsername?.trim()?.includes('hackerrank.com')
        ? values.hackerrankUsername.trim().split(/[\/profile\/|\/]/).filter(Boolean).pop()
        : values.hackerrankUsername?.trim();

    const gfgUsername = values.gfgUsername?.trim()?.includes('geeksforgeeks.org')
        ? values.gfgUsername.trim().split(/[\/user\/|\/]/).filter(Boolean).pop()
        : values.gfgUsername?.trim();

    const user = await prisma.user.update({
        where: { email: email },
        data: {
            ...values,
            leetcodeUsername,
            hackerrankUsername,
            gfgUsername,
            isLocked: true,
        },
        include: {
            leetcodeProfile: true,
            hackerrankProfile: {
                include: {
                    badges: true
                }
            },
            gfgProfile: true,
            leaderboardStats: true
        }
    });

    // Fetch profile and update leaderboard in the background
    fetchAndUpdateProfile(user).catch(console.error);

    revalidatePath('/profile', 'page');
    return user;
}

export async function getUserProfile(username: string) {
    

    try {
        const user = await prisma.user.findMany({
            where: {
                username: username,
            },
            include: {
                leaderboardStats: true,
                gfgProfile: true,
                leetcodeProfile: true,
                hackerrankProfile: {
                    include: {
                        badges: true,
                    },
                },
            },
        });
        if (user.length === 0) {
            return null;
        }
        updateProfileView(username);
        return user[0];
    } catch (error) {
        console.error(`Error fetching user profile for username ${username}:`, error);
        return null;
    }
}

export async function updateProfileView(username: string) {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent');
    const browser = userAgent ? (userAgent.includes("Chrome") ? "Chrome" :
        userAgent.includes("Firefox") ? "Firefox" :
            userAgent.includes("Safari") ? "Safari" :
                userAgent.includes("MSIE") ? "Internet Explorer" : "Unknown Browser")
        : "Unknown Browser";
    const device = userAgent ? (/Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop") : "Unknown Device";
    const os = userAgent ? (userAgent.includes("Win") ? "Windows" :
        userAgent.includes("Mac") ? "MacOS" :
            userAgent.includes("Linux") ? "Linux" :
                userAgent.includes("Android") ? "Android" :
                    userAgent.includes("iOS") ? "iOS" : "Unknown OS")
        : "Unknown OS";
    const lastProfileView = await prisma.profileView.findMany({
        where: {
            username,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
    });
    if (lastProfileView.length > 0) {
        const diff = new Date().getTime() - lastProfileView[0].createdAt.getTime();
        if (diff < 1000 * 60) {
            const lastView = lastProfileView[0];
            if (lastView.browser === browser && lastView.device === device && lastView.operatingSystem === os) {
                return; // Return if all are the same
            }
        }
    }
    try {
        const profileView = await prisma.profileView.create({
            data: {
                username,
            browser,
            device,
            operatingSystem: os,
            },
        });
        return profileView;
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: '[users.ts] updateProfileView',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        return null;
    }
}