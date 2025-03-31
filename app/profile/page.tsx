import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/ui/profile-form";
import { getUser } from "@/lib/actions/users";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ShareButton } from "@/components/ui/share-button";

export default async function Profile() {
  const user = await getUser();
  if (!user) {
    redirect("/get-started");
  }
  return (
    <main>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Profile</h2>
        <ShareButton name={user.name || ""} username={user.username || ""} totalSolved={user.totalSolved || 0} campusRank={user.leaderboardStats?.globalRank || 0} leetcodeRank={user.leetcodeProfile?.ranking || 0} gfgRank={user.gfgProfile?.rank || '-'} easySolved={user.easySolved || 0} mediumSolved={user.mediumSolved || 0} hardSolved={user.hardSolved || 0} gfgSolved={Number(user.gfgProfile?.solvedProblems) || 0} gfgScore={Number(user.gfgProfile?.codingScore) || 0} badges={user.hackerrankProfile?.badges || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="profile-card">
            <CardHeader>
              <CardTitle>User Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={user.image ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit%20Sharma"}
                    alt={user.name ?? ""}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">LeetCode Stats</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Easy</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {user.easySolved}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Medium</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {user.mediumSolved}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Hard</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {user.hardSolved}
                      </p>
                    </div>
                  </div>
                </div>

                {user.hackerrankProfile?.badges && user.hackerrankProfile.badges.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">HackerRank Badges</h3>
                    <div className="grid grid-cols-5 gap-2">
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
                          <div key={idx} className={`relative group w-full h-[80px] p-2 bg-gradient-to-br ${colors.gradient} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                            <div className={`absolute inset-[2px] bg-gradient-to-br ${colors.innerGradient} rounded-[6px] flex flex-col items-center justify-center p-2`}>
                              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 ${colors.bgColor} rounded-full flex items-center justify-center shadow-lg border-2 ${colors.borderColor}`}>
                                <span className="text-white text-sm font-bold flex items-center">{badge.stars} <span className={`${colors.starColor} shadow-lg text-xs`}>★</span></span>
                              </div>
                              <div className="mt-2 text-center flex flex-col items-center gap-1">
                                <span className="text-white/90">🏆</span>
                                <span className="text-[8px] font-semibold text-white/90 line-clamp-2 uppercase tracking-wide">
                                  {badge.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3">GeeksForGeeks Stats</h3>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Problems Solved</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {user.gfgProfile?.solvedProblems || '0'}
                    </p>
                  </div>
                </div>

                {user.leaderboardStats && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Campus Ranking</h3>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Current Rank</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        #{user.leaderboardStats.globalRank || 'N/A'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <ProfileForm user={user} />
        </div>
      </div>

      {/* <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Contest History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="p-4 bg-muted rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            Weekly Contest {238 - i}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Rank: #{Math.floor(Math.random() * 1000 + 1)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            {Math.floor(Math.random() * 4)}/4 solved
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                Date.now() - i * 7 * 24 * 60 * 60 * 1000
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div> */}
    </main>
  );
}