"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Medal, Star, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";



export function TopPerformers({ leaderboards }: any) {
  // const [isDismissed, setIsDismissed] = useState(false);
  // const topThree = leaderboards
  //   .sort((a: any, b: any) => {
  //     if (!a.globalRank) return 1;
  //     if (!b.globalRank) return -1;
  //     return a.globalRank - b.globalRank;
  //   })
  //   .slice(0, 3);
  // return (
  //   <>
  //     {!isDismissed && (
  //       <Alert variant="default" className="mb-4 relative flex items-center gap-3 bg-gray-200 dark:bg-gray-800">
  //         <button
  //           onClick={() => setIsDismissed(true)}
  //           className="absolute top-2 right-2 text-destructive hover:text-destructive"
  //         >
  //           <X className="h-8 w-8 text-black cursor-pointer dark:text-white" />
  //         </button>
  //         <AlertCircle className="h-5 w-5"/>
  //         <div className="flex flex-col">
  //           <AlertTitle>Last Updated</AlertTitle>
  //           <AlertDescription className="text-start">
  //             Leaderboard was last updated {timeAgo(topThree[1]?.lastUpdated)}
  //           </AlertDescription>
  //         </div>
  //       </Alert>
  //     )}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  //       {topThree.map((leaderboard: any, index: number) => (
  //         <motion.div
  //           key={leaderboard.user.id}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: index * 0.2 }}
  //         >
  //           <Card className="h-full overflow-hidden">
  //             <CardHeader className="relative">
  //               <Medal
  //                 className={`absolute top-4 right-4 h-6 w-6 ${getMedalColor(
  //                   index
  //                 )}`}
  //               />
  //               <div className="flex flex-col items-center">
  //                 <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
  //                   <Image
  //                     src={
  //                       leaderboard.user.image ||
  //                       `https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboard.user.name}`
  //                     }
  //                     alt={leaderboard.user.name}
  //                     className="w-full h-full object-cover"
  //                     width={96}
  //                     height={96}
  //                   />
  //                 </div>
  //                 <CardTitle className="text-xl">{leaderboard.user.name}</CardTitle>
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <div>
  //                 <p className="text-sm font-semibold text-muted-foreground mb-3">LeetCode Solved</p>
  //                 <div className="mt-4 grid grid-cols-3 gap-4 text-center">
  //                   <div>
  //                     <p className="text-sm text-muted-foreground">Easy</p>
  //                     <p className="text-lg font-semibold text-green-600 dark:text-green-400">
  //                       {leaderboard.user.easySolved}
  //                     </p>
  //                   </div>
  //                   <div>
  //                     <p className="text-sm text-muted-foreground">Medium</p>
  //                     <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
  //                       {leaderboard.user.mediumSolved}
  //                     </p>
  //                   </div>
  //                   <div>
  //                     <p className="text-sm text-muted-foreground">Hard</p>
  //                     <p className="text-lg font-semibold text-red-600 dark:text-red-400">
  //                       {leaderboard.user.hardSolved}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //               {/* {leaderboard.user.hackerrankProfile?.badges.length > 0 && (
  //               <div className="mt-6">
  //                 <p className="text-sm font-semibold text-muted-foreground mb-3">Hacker Rank Badges</p>
  //                 <div className="flex flex-wrap justify-center gap-2">
  //                   {leaderboard.user.hackerrankProfile.badges.map((badge: any, idx: number) => (
  //                     <div
  //                       key={idx}
  //                       className="relative w-[calc(20%-8px)] min-w-[100px] flex flex-col items-center"
  //                     >
  //                       <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-t-[50%] rounded-b-[50%] border-2 border-green-200 dark:border-green-800 shadow-sm flex flex-col items-center justify-center">
  //                         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-full flex items-center justify-center">
  //                           <span className="text-yellow-500 text-sm">★</span>
  //                         </div>
  //                         <div className="text-center px-2">
  //                           <span className="text-xs font-medium text-green-800 dark:text-green-200 block leading-tight">
  //                             {badge.name}
  //                           </span>
  //                           <span className="text-[10px] text-green-600 dark:text-green-400 mt-1">
  //                             {badge.stars}★
  //                           </span>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             )} */}
  //               {leaderboard.user.hackerrankProfile?.badges.length > 0 && (
  //                 <div className="mt-6">
  //                   <p className="text-sm font-semibold text-muted-foreground mb-3">HackerRank Badges</p>
  //                   <div className="mt-4 grid grid-cols-5 gap-2">
  //                     {leaderboard.user.hackerrankProfile.badges.map((badge: any, idx: number) => {
  //                       const stars = parseInt(badge.stars);
  //                       const getBadgeColors = () => {
  //                         if (stars === 5) {
  //                           return {
  //                             gradient: "from-amber-500/70 to-yellow-600/70",
  //                             innerGradient: "from-amber-400/70 to-yellow-500/70",
  //                             starColor: "text-yellow-300",
  //                             borderColor: "border-yellow-500",
  //                             bgColor: "bg-yellow-400"
  //                           };
  //                         } else if (stars === 4) {
  //                           return {
  //                             gradient: "from-slate-400 to-gray-500",
  //                             innerGradient: "from-slate-300 to-gray-400",
  //                             starColor: "text-slate-200",
  //                             borderColor: "border-slate-500",
  //                             bgColor: "bg-slate-400"
  //                           };
  //                         } else {
  //                           return {
  //                             gradient: "from-amber-700 to-amber-800",
  //                             innerGradient: "from-amber-600 to-amber-700",
  //                             starColor: "text-amber-200",
  //                             borderColor: "border-amber-800",
  //                             bgColor: "bg-amber-700"
  //                           };
  //                         }
  //                       };
  //                       const colors = getBadgeColors();
  //                       return idx < 5 && (
  //                         <div key={idx} className={`relative group w-full h-[80px] p-2 bg-gradient-to-br ${colors.gradient} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
  //                           <div className={`absolute inset-[2px] bg-gradient-to-br ${colors.innerGradient} rounded-[6px] flex flex-col items-center justify-center p-2`}>
  //                             <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 ${colors.bgColor} rounded-full flex items-center justify-center shadow-lg border-2 ${colors.borderColor}`}>
  //                               <span className="text-white text-sm font-bold flex items-center">{badge.stars}  <span className={`${colors.starColor} shadow-lg text-xs`}>★</span></span>
  //                             </div>
  //                             <div className="mt-2 text-center flex flex-col items-center gap-1">
  //                               <span className="text-white/90">🏆</span>
  //                               <span className="text-[8px] font-semibold text-white/90 line-clamp-2 uppercase tracking-wide">
  //                                 {badge.name}
  //                               </span>
  //                             </div>
  //                             <div className="absolute bottom-1 flex items-center justify-center">
  //                               {/* <div className="flex gap-0.5">
  //                               {[...Array(stars)].map((_, i) => (
  //                                 <span key={i} className={`${colors.starColor} text-xs`}>★</span>
  //                               ))}
  //                             </div> */}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       );
  //                     })}
  //                   </div>
  //                 </div>
  //               )}
  //               <div className="grid grid-cols-2 gap-4">
  //                 <div className="mt-4">
  //                   <p className="text-sm font-semibold text-muted-foreground mb-3">GFG Solved</p>
  //                   <p className="text-lg font-semibold text-sky-600 dark:text-sky-400">
  //                     {leaderboard.user.gfgProfile?.solvedProblems || '0'}
  //                   </p>
  //                 </div>
  //                 <div className="mt-4">
  //                   <p className="text-sm font-semibold text-muted-foreground mb-3">GFG Score</p>
  //                   <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
  //                     {leaderboard.user.gfgProfile?.codingScore || '0'}
  //                   </p>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </motion.div>
  //       ))}
  //       {topThree.length < 3 && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: topThree.length * 0.2 }}
  //         >
  //           <Card className="h-full overflow-hidden border-2 border-dashed">
  //             <CardHeader>
  //               <div className="flex flex-col items-center">
  //                 <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-muted flex items-center justify-center">
  //                   <Medal className="h-12 w-12 text-muted-foreground" />
  //                 </div>
  //                 <CardTitle className="text-xl">This Spot is for You!</CardTitle>
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="text-center">
  //                 <p className="text-muted-foreground mb-4">Join us now and climb the ranks!</p>
  //                 <p className="text-sm text-muted-foreground mb-6">
  //                   Track your progress across LeetCode, HackerRank, and GeeksForGeeks.
  //                   Compete with fellow developers and showcase your problem-solving skills.
  //                 </p>
  //                 <div className="flex flex-col gap-4 items-center">
  //                   <div className="flex items-center gap-2">
  //                     <span className="text-yellow-500">⭐</span>
  //                     <p className="text-sm">Earn badges and achievements</p>
  //                   </div>
  //                   <div className="flex items-center gap-2">
  //                     <span className="text-blue-500">📈</span>
  //                     <p className="text-sm">Track your growth over time</p>
  //                   </div>
  //                   <div className="flex items-center gap-2">
  //                     <span className="text-green-500">🏆</span>
  //                     <p className="text-sm">Compete for top positions</p>
  //                   </div>
  //                   <Link href="/profile" className="mt-2">
  //                     <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
  //                       Get Started
  //                     </button>
  //                   </Link>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </motion.div>
  //       )}
  //     </div>
  //   </>
  // );

  return (<>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {leaderboards.slice(0, 3).map((leaderboard: any, index: number) => (
        <Card key={leaderboard.id} className=" hover:scale-105 transition-bounce border-0 bg-card/50 backdrop-blur-sm relative dark:bg-background">
          {index === 0 && (
            <div className="absolute -top-2 -right-2 bg-primary dark:bg-accent text-white text-xs px-2 py-1 rounded-full font-bold">
              #1
            </div>
          )}
          <CardHeader className="text-center pb-4">
            <div className="relative mx-auto">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage src={leaderboard.user.isPublic ? leaderboard.user.image : ''} alt={leaderboard.user.isPublic ? leaderboard.user.name : 'Shealth Learner'} />
                <AvatarFallback>{leaderboard.user.isPublic ? leaderboard.user.name.charAt(0) : 'S'}</AvatarFallback>
              </Avatar>
              {index < 3 && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              )}
            </div>
            <CardTitle className="text-lg dark:text-accent">{leaderboard.user.isPublic ? leaderboard.user.name : 'Shealth Learner'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* LeetCode Stats */}
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2 dark:text-foreground">LeetCode Solved</div>
              <div className="grid grid-cols-3 gap-2">
                <StatCard title="Easy" value={leaderboard.user.easySolved} color="green-500" />
                <StatCard title="Medium" value={leaderboard.user.mediumSolved} color="yellow-500" />
                <StatCard title="Hard" value={leaderboard.user.hardSolved} color="red-500" />
              </div>
            </div>

            {/* HackerRank Badges */}
            {leaderboard.user.hackerrankProfile?.badges.length > 0 && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2 dark:text-foreground">HackerRank Badges</div>
                <div className="flex flex-wrap gap-1">
                  {leaderboard.user.hackerrankProfile.badges.map((skill: any, idx: number) => (
                    <HackerRankBadge key={idx} skill={skill.name} stars={Number(skill.stars)} />
                  ))}
                </div>
              </div>
            )}

            {/* GFG Stats */}
            {leaderboard.user.gfgProfile && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2 dark:text-foreground">GeeksforGeeks</div>
                <div className="grid grid-cols-2 gap-2">
                  <StatCard title="Solved" value={leaderboard.user.gfgProfile?.solvedProblems || '0'} color="primary" />
                  <StatCard title="Score" value={leaderboard.user.gfgProfile?.codingScore || '0'} color="purple-500" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </>);
}

function getMedalColor(index: number): string {
  switch (index) {
    case 0:
      return "text-yellow-500";
    case 1:
      return "text-gray-400";
    case 2:
      return "text-amber-600";
    default:
      return "";
  }
}

const StatCard = ({ title, value, color = "primary" }: { title: string; value: number; color?: string }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold text-${color}`}>{value}</div>
    <div className="text-xs text-muted-foreground">{title}</div>
  </div>
);

const HackerRankBadge = ({ skill, stars }: { skill: string; stars: number }) => (
  <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-md">
    <div className="flex">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-orange-500 text-orange-500" />
      ))}
    </div>
    <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
      {skill}
    </span>
  </div>
);