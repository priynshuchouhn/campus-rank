import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trophy, Star, Clock, Lock, UserPlus } from "lucide-react";
import { LeaderboardTable } from "@/components/ui/leaderboard-table";
import { getLeaderboard } from "@/lib/actions/leaderboard";
import { TopPerformers } from "@/components/ui/top-performers";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/ui/auth-dialog";


export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboard();
    const session = await auth();
    const isLoggedIn = session?.user
    const displayData = session?.user ? leaderboardData : leaderboardData.slice(0, 5);

    //   if (loading) {
    //     return (
    //       <div className="min-h-screen bg-background flex items-center justify-center">
    //         <div className="text-center">
    //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-campus mx-auto"></div>
    //           <p className="mt-2 text-muted-foreground">Loading...</p>
    //         </div>
    //       </div>
    //     );
    //   }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {!isLoggedIn && (
                    <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between flex-col gap-3 lg:flex-row">
                                <div className="flex items-center gap-3">
                                    <Lock className="h-5 w-5 text-primary dark:text-accent" />
                                    <div>
                                        <h3 className="font-semibold dark:text-accent">Unlock Full Leaderboard</h3>
                                        <p className="text-sm text-muted-foreground dark:text-foreground">
                                            Sign in to view all rankings and compete with your peers
                                        </p>
                                    </div>
                                </div>
                                <AuthDialog>
                                    <Button className="w-full lg:w-auto">
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Sign In
                                    </Button>
                                </AuthDialog>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/* Top 3 Cards */}
                <TopPerformers leaderboards={displayData} />

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-accent" />
                        <Input
                            placeholder="Search by name..."
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Leaderboard Table */}
                <LeaderboardTable leaderboards={displayData} isLoggedIn={!!isLoggedIn} />

            </div>
        </div>
    );
};

