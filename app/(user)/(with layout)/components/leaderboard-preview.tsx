import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, Users, Zap, TrendingUp, Target, Crown, Star, Medal } from "lucide-react";
import Link from "next/link";


export function LeaderboardPreview({leaderboard}:any) {
  const topUsers = leaderboard
    .sort((a: any, b: any) => {
      if (!a.globalRank) return 1;
      if (!b.globalRank) return -1;
      return a.globalRank - b.globalRank;
    })
    .slice(0, 3);  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-campus/5 via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-campus/10 text-primary mb-6 animate-fade-in dark:text-accent">
            <Zap className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-semibold">Real-Time Competitive Rankings</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent animate-fade-in dark:to-accent">
            Where Coding <span className="text-primary dark:text-accent">Champions</span> Rise
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: "0.2s"}}>
            Track your journey from beginner to placement champion. Live rankings across 
            <strong className="text-primary dark:text-accent"> LeetCode</strong>, 
            <strong className="text-primary dark:text-accent"> HackerRank</strong>, and 
            <strong className="text-primary dark:text-accent"> GeeksforGeeks</strong> — all in one leaderboard.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {[
            { icon: Users, value: "5,000+", label: "Active Students", color: "text-blue-500", delay: "0s" },
            { icon: Target, value: "50K+", label: "Problems Solved", color: "text-green-500", delay: "0.1s" },
            { icon: TrendingUp, value: "200+", label: "Daily Updates", color: "text-purple-500", delay: "0.2s" },
            { icon: Crown, value: "95%", label: "Placement Rate", color: "text-campus", delay: "0.3s" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:scale-105 transition-all duration-300 animate-fade-in group hover:shadow-lg hover:shadow-campus/10"
              style={{animationDelay: stat.delay}}
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* Champion Podium */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-campus/20 overflow-hidden dark:from-background dark:to-background">
            <div className="absolute inset-0 bg-gradient-to-r from-campus/5 to-transparent"></div>
            
            <CardHeader className="text-center pb-8 relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="h-6 w-6 text-yellow-500 animate-pulse" />
                <h3 className="text-2xl font-bold dark:text-accent-foreground">This Week&apos;s Champions</h3>
                <Crown className="h-6 w-6 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-muted-foreground">Updated in real-time • Last sync: 2 minutes ago</p>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-6">
                {topUsers.map((leaderboard:any, index: number) => (
                  <div 
                    key={leaderboard.user.id} 
                    className={`relative p-6 rounded-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in group ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20' 
                        : 'bg-background/50 hover:bg-background/80 border border-border/50'
                    }`}
                    style={{animationDelay: `${index * 0.15}s`}}
                  >
                    {/* Rank Badge */}
                    {index === 0 && (
                      <div className="absolute -top-3 left-6">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                          <Crown className="h-3 w-3" />
                          CHAMPION
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar with Status */}
                        <div className="relative">
                          <Avatar className={`h-16 w-16 ring-2 transition-all duration-300 ${
                            index === 0 ? 'ring-yellow-500/50' : 'ring-campus/30'
                          }`}>
                            <AvatarImage src={leaderboard.user.image} alt={leaderboard.user.name} />
                            <AvatarFallback>{leaderboard.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          {/* Rank Number */}
                          <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold animate-bounce ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                            'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                          }`}>
                            {leaderboard.globalRank}
                          </div>
                          
                          {/* Online Status */}
                          {/* {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                          )} */}
                        </div>
                        
                        {/* User Info */}
                        <div>
                          <div className="font-bold text-lg dark:text-accent">{leaderboard.user.name}</div>
                          {/* <div className="text-sm text-muted-foreground">{user.university}</div> */}
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {leaderboard.user.totalSolved} solved
                            </Badge>
                            {/* <Badge variant="outline" className="text-xs text-orange-600 border-orange-600/20">
                              {user.leetcodeRating} rating
                            </Badge> */}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2 justify-end">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-semibold">+{Math.floor(leaderboard.overallScore)} this week</span>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <Star className="h-4 w-4 text-primary dark:text-accent-foreground" />
                          <span className="text-primary font-medium dark:text-accent-foreground">{0} day streak</span>
                        </div>
                        {index < 3 && (
                          <Medal className={`h-5 w-5 ml-auto ${
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            'text-orange-600'
                          } animate-pulse`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-10">
                <Link href="/leaderboard">
                  <Button>
                    <Trophy className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Join the Competition
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Status Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-campus/10 to-primary/10 border border-campus/20 animate-fade-in">
            <div className="relative">
              <div className="w-3 h-3 bg-campus rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-3 h-3 bg-campus rounded-full"></div>
            </div>
            <span className="text-primary font-semibold dark:text-accent">Live Rankings • Updated Every 24 Hours</span>
            <Zap className="h-4 w-4 text-primary dark:text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}