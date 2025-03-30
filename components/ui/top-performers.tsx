"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "@/lib/interfaces";
import { LeaderboardStats } from "@prisma/client";

interface TopPerformersProps {
  leaderboards: (LeaderboardStats & { user: User })[];
}

export function TopPerformers({ leaderboards }: TopPerformersProps) {
  const topThree = leaderboards
    .sort((a, b) => b.globalRank! - a.globalRank!)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {topThree.map((leaderboard, index) => (
        <motion.div
          key={leaderboard.user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="relative">
              <Medal
                className={`absolute top-4 right-4 h-6 w-6 ${getMedalColor(
                  index
                )}`}
              />
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image
                    src={
                      leaderboard.user.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboard.user.name}`
                    }
                    alt={leaderboard.user.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <CardTitle className="text-xl">{leaderboard.user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Easy</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {leaderboard.user.easySolved}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medium</p>
                  <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {leaderboard.user.mediumSolved}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hard</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {leaderboard.user.hardSolved}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {topThree.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: topThree.length * 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-dashed">
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-muted flex items-center justify-center">
                  <Medal className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">This Spot is for You!</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Join us now and climb the ranks!</p>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
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