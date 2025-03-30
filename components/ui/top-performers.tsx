"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "@/lib/interfaces";

interface TopPerformersProps {
  users: User[];
}

export function TopPerformers({ users }: TopPerformersProps) {
  const topThree = users
    .sort((a, b) => b.totalSolved - a.totalSolved)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {topThree.map((user, index) => (
        <motion.div
          key={user.id}
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
                      user.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                    
                  />
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Easy</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {user.easySolved}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medium</p>
                  <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {user.mediumSolved}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hard</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {user.hardSolved}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
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