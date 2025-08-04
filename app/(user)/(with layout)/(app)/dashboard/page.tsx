import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/actions/users";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ShareButton } from "@/components/ui/share-button";
import {
    Eye,
    Award,
    BookOpen,
    Code,
    BarChart3,
    Calendar,
    ArrowRight,
    GraduationCap,
    LineChart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    const user = await getUser();
    if (!user) {
        redirect("/get-started");
    }

    return (
        <main>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <ShareButton
                    name={user.name || ""}
                    username={user.username || ""}
                    totalSolved={user.totalSolved || 0}
                    campusRank={user.leaderboardStats?.globalRank || 0}
                    leetcodeRank={user.leetcodeProfile?.ranking || 0}
                    gfgRank={user.gfgProfile?.rank || '-'}
                    easySolved={user.easySolved || 0}
                    mediumSolved={user.mediumSolved || 0}
                    hardSolved={user.hardSolved || 0}
                    gfgSolved={Number(user.gfgProfile?.solvedProblems) || 0}
                    gfgScore={Number(user.gfgProfile?.codingScore) || 0}
                    badges={user.hackerrankProfile?.badges || []}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4 mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <Image
                                    src={user.image ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit%20Sharma"}
                                    alt={user.name ?? ""}
                                    className="w-full h-full object-cover"
                                    width={96}
                                    height={96}
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold">{user.name}</h2>
                                <p className="text-muted-foreground">@{user.username}</p>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                            <Link href="/profile" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Edit Profile
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Profile Views</span>
                                <span className="flex items-center text-sm">
                                    {user.profileView?.length || 0}
                                    <Eye className="ml-1 w-4 h-4" />
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Campus Rank</span>
                                <span className="flex items-center text-sm">
                                    #{user.leaderboardStats?.globalRank || 'N/A'}
                                    <Award className="ml-1 w-4 h-4" />
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">LeetCode Rating</span>
                                <span className="flex items-center text-sm">
                                    {user.leetcodeProfile?.ranking || 'N/A'}
                                    <LineChart className="ml-1 w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Problem Solving Stats */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Problem Solving Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                            <div className="mb-4 p-4 bg-muted rounded-lg dark:bg-background">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-muted-foreground dark:text-accent-foreground">Total Solved</p>
                                        <p className="text-xl font-bold">{user.totalSolved || 0}</p>
                                    </div>
                                    <div className="mt-2 bg-background rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full dark:bg-accent"
                                            style={{ width: `${Math.min((user.totalSolved || 0) / 5, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <h3 className="text-base font-medium mb-3">LeetCode Problems</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-muted rounded-lg dark:bg-background">
                                        <p className="text-sm text-muted-foreground dark:text-accent-foreground">Easy</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {user.easySolved || 0}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg dark:bg-background">
                                        <p className="text-sm text-muted-foreground dark:text-accent-foreground">Medium</p>
                                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                            {user.mediumSolved || 0}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg dark:bg-background">
                                        <p className="text-sm text-muted-foreground dark:text-accent-foreground">Hard</p>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                            {user.hardSolved || 0}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="">
                                    <h3 className="text-base font-medium mb-3">GeeksForGeeks</h3>
                                    <div className="p-4 bg-muted rounded-lg dark:bg-background">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground dark:text-accent-foreground">Problems Solved</p>
                                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                                {user.gfgProfile?.solvedProblems || '0'}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-muted-foreground dark:text-accent-foreground">Coding Score</p>
                                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {user.gfgProfile?.codingScore || '0'}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-muted-foreground dark:text-accent-foreground">Institute Rank</p>
                                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {user.gfgProfile?.rank || '0'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <h3 className="text-base font-medium mb-3">HackerRank Badges</h3>
                                    <div className="p-4 bg-muted rounded-lg dark:bg-background">
                                        {user.hackerrankProfile?.badges && user.hackerrankProfile.badges.length > 0 ? (
                                            <div className="grid grid-cols-4 gap-2">
                                                {user.hackerrankProfile.badges.map((badge: any, idx: number) => {
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
                                                    return idx < 5 && (
                                                        <div key={idx} className={`relative group w-full h-[80px] p-2 bg-gradient-to-br ${colors.gradient} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-2`}>
                                                            <div className={`absolute inset-[2px] bg-gradient-to-br ${colors.innerGradient} rounded-[6px] flex flex-col items-center justify-center p-2`}>
                                                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 ${colors.bgColor} rounded-full flex items-center justify-center shadow-lg border-2 ${colors.borderColor}`}>
                                                                    <span className="text-white text-sm font-bold flex items-center">{badge.stars}  <span className={`${colors.starColor} shadow-lg text-xs`}>★</span></span>
                                                                </div>
                                                                <div className="mt-2 text-center flex flex-col items-center gap-1">
                                                                    <span className="text-white/90">🏆</span>
                                                                    <span className="text-[8px] font-semibold text-white/90 line-clamp-2 uppercase tracking-wide">
                                                                        {badge.name}
                                                                    </span>
                                                                </div>
                                                                <div className="absolute bottom-1 flex items-center justify-center">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground dark:text-accent-foreground dark:justify-start">
                                                No badges earned yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Learning Progress */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Learning Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>Roadmap Progress</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted w-[100px] h-2 rounded-full">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <span className="text-sm font-medium">45%</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Code className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>Weekly Goal Completion</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted w-[100px] h-2 rounded-full">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                    <span className="text-sm font-medium">70%</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>Concept Mastery</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted w-[100px] h-2 rounded-full">
                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                    <span className="text-sm font-medium">60%</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link href="/roadmap">
                                    <Button variant="outline" className="w-full">
                                        View Roadmap
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

                {/* Recent Activity */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Solved 'Two Sum' problem",
                                    date: "Today",
                                    platform: "LeetCode",
                                    difficulty: "Easy",
                                    icon: <Code className="h-4 w-4 text-green-500" />
                                },
                                {
                                    title: "Updated weekly goals",
                                    date: "Yesterday",
                                    platform: "CampusRank",
                                    difficulty: "",
                                    icon: <Calendar className="h-4 w-4 text-blue-500" />
                                },
                                {
                                    title: "Completed 'Arrays' section",
                                    date: "3 days ago",
                                    platform: "Roadmap",
                                    difficulty: "",
                                    icon: <BookOpen className="h-4 w-4 text-purple-500" />
                                },
                            ].map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                                >
                                    <div className="mt-0.5">{activity.icon}</div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">{activity.title}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-muted-foreground">{activity.date}</span>
                                            <span className="text-xs bg-background px-2 py-0.5 rounded-full">{activity.platform}</span>
                                            {activity.difficulty && (
                                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                                    {activity.difficulty}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2">
                                <Button variant="ghost" className="w-full text-muted-foreground">
                                    View All Activity
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </main>
    );
} 