import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, Award, User } from "lucide-react";
import Image from "next/image";
import { HackerRankBadge } from "@prisma/client";
import { getUserProfile } from "@/lib/actions/users";
import { redirect } from "next/navigation";
import { ShareButton } from "@/components/ui/share-button";

export default async function UserProfile({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const user = await getUserProfile(username);
    if (!user) {
        redirect("/");
    }

    return (
        <div className="mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                                <Image
                                    src={
                                        user.image ||
                                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                                    }
                                    alt={user.name || ""}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-left flex-1">
                                <div className="flex justify-center md:justify-between gap-4 items-start">
                                    <div>
                                        <h1 className="md:text-3xl text-xl font-bold mb-2">{user.name}</h1>
                                        <p className="text-muted-foreground mb-4">@{user.username}</p>
                                    </div>
                                    <ShareButton
                                        name={user.name || ""}
                                        username={user.username || ""}
                                        image={user.image}
                                        totalSolved={Number(user.totalSolved) || 0}
                                        campusRank={Number(user.leaderboardStats?.globalRank) || 0}
                                        leetcodeRank={Number(user.leetcodeProfile?.ranking) || 0}
                                        gfgRank={user.gfgProfile?.rank || '-'}
                                        easySolved={Number(user.easySolved) || 0}
                                        mediumSolved={Number(user.mediumSolved) || 0}
                                        hardSolved={Number(user.hardSolved) || 0}
                                        gfgSolved={Number(user.gfgProfile?.solvedProblems) || 0}
                                        gfgScore={Number(user.gfgProfile?.codingScore) || 0}
                                        badges={user.hackerrankProfile?.badges?.map(badge => ({
                                            name: badge.name,
                                            stars: badge.stars
                                        }))}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    {user.leetcodeUsername && (
                                        <a
                                            href={`https://leetcode.com/${user.leetcodeUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
                                        >
                                            <Target className="w-4 h-4" />
                                            <span>LeetCode</span>
                                        </a>
                                    )}
                                    {user.hackerrankUsername && (
                                        <a
                                            href={`https://www.hackerrank.com/${user.hackerrankUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-green-500 hover:text-green-600"
                                        >
                                            <Trophy className="w-4 h-4" />
                                            <span>HackerRank</span>
                                        </a>
                                    )}
                                    {user.gfgUsername && (
                                        <a
                                            href={`https://auth.geeksforgeeks.org/user/${user.gfgUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-purple-500 hover:text-purple-600"
                                        >
                                            <Award className="w-4 h-4" />
                                            <span>GeeksforGeeks</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card className="mb-8 profile-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-orange-500" />
                            User Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 relative overflow-hidden">
                                <p className="text-sm text-muted-foreground">Total Solved</p>
                                <p className="text-2xl font-bold text-blue-500">
                                    {user.totalSolved || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-purple-100 dark:bg-purple-900/20 relative overflow-hidden">
                                <p className="text-sm text-muted-foreground">Campus Rank</p>
                                <p className="text-2xl font-bold text-purple-500">
                                    {user.leaderboardStats?.globalRank || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-rose-100 dark:bg-rose-900/20 relative overflow-hidden">
                                <p className="text-sm text-muted-foreground">LeetCode Global Rank</p>
                                <p className="text-2xl font-bold text-rose-500">
                                    {user.leetcodeProfile?.ranking || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-amber-100 dark:bg-amber-900/20 relative overflow-hidden">
                                <p className="text-sm text-muted-foreground">GFG Institute Rank</p>
                                <p className="text-2xl font-bold text-amber-500">
                                    {user.gfgProfile?.rank || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* LeetCode Stats */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-orange-500" />
                            LeetCode Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                <p className="text-sm text-muted-foreground">Easy</p>
                                <p className="text-2xl font-bold text-green-500">
                                    {user.easySolved || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                                <p className="text-sm text-muted-foreground">Medium</p>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {user.mediumSolved || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                <p className="text-sm text-muted-foreground">Hard</p>
                                <p className="text-2xl font-bold text-red-500">
                                    {user.hardSolved || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* HackerRank Badges */}
                {user.hackerrankProfile?.badges && user.hackerrankProfile.badges.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-green-500" />
                                HackerRank Badges
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {user.hackerrankProfile.badges.map((badge: HackerRankBadge, idx: number) => {
                                    const stars = parseInt(badge.stars);
                                    const getBadgeColors = () => {
                                        if (stars === 5) {
                                            return {
                                                gradient: "from-amber-500/70 to-yellow-600/70",
                                                innerGradient: "from-amber-400/70 to-yellow-500/70",
                                                starColor: "text-yellow-300",
                                                borderColor: "border-yellow-500",
                                                bgColor: "bg-yellow-400"
                                            };
                                        } else if (stars === 4) {
                                            return {
                                                gradient: "from-slate-400 to-gray-500",
                                                innerGradient: "from-slate-300 to-gray-400",
                                                starColor: "text-slate-200",
                                                borderColor: "border-slate-500",
                                                bgColor: "bg-slate-400"
                                            };
                                        } else {
                                            return {
                                                gradient: "from-amber-700 to-amber-800",
                                                innerGradient: "from-amber-600 to-amber-700",
                                                starColor: "text-amber-200",
                                                borderColor: "border-amber-800",
                                                bgColor: "bg-amber-700"
                                            };
                                        }
                                    };
                                    const colors = getBadgeColors();
                                    return (
                                        <div
                                            key={idx}
                                            className={`relative group w-full h-[100px] bg-gradient-to-br ${colors.gradient} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                                        >
                                            <div className={`absolute inset-[2px] bg-gradient-to-br ${colors.innerGradient} rounded-[6px] flex flex-col items-center justify-center p-2`}>
                                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 ${colors.bgColor} rounded-full flex items-center justify-center shadow-lg border-2 ${colors.borderColor}`}>
                                                    <span className="text-white text-sm font-bold flex items-center">
                                                        {badge.stars}{" "}
                                                        <span className={`${colors.starColor} shadow-lg text-xs`}>★</span>
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-center flex flex-col items-center gap-1">
                                                    <span className="text-white/90">🏆</span>
                                                    <span className="text-sm font-semibold text-white/90 line-clamp-2 uppercase tracking-wide">
                                                        {badge.name}
                                                    </span>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(stars)].map((_, i) => (
                                                            <span key={i} className={`${colors.starColor} text-xs`}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* GFG Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-500" />
                            GeeksforGeeks Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                <p className="text-sm text-muted-foreground">Problems Solved</p>
                                <p className="text-2xl font-bold text-purple-500">
                                    {user.gfgProfile?.solvedProblems || 0}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                <p className="text-sm text-muted-foreground">Coding Score</p>
                                <p className="text-2xl font-bold text-purple-500">
                                    {user.gfgProfile?.codingScore || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
