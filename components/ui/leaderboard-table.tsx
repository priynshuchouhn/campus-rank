"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/interfaces";
import { LeaderboardStats } from "@prisma/client";
import { Medal } from "lucide-react";

interface LeaderboardTableProps {
  leaderboards: (LeaderboardStats & {user:User})[];
  searchQuery: string;
}

export function LeaderboardTable({ leaderboards, searchQuery }: LeaderboardTableProps) {
  const filteredUsers = leaderboards
    .filter((leaderboard) =>
      leaderboard.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.globalRank! - b.globalRank!);

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Total Solved</TableHead>
            <TableHead className="text-right">Easy</TableHead>
            <TableHead className="text-right">Medium</TableHead>
            <TableHead className="text-right">Hard</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((leaderboard, index) => (
            <TableRow
              key={leaderboard.user.id}
              className="transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <TableCell className="font-medium">
                {index < 3 ? (
                  <Medal className={`h-5 w-5 ${getMedalColor(index)}`} />
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell>{leaderboard.user.name}</TableCell>
              <TableCell className="text-right">{leaderboard.user.totalSolved}</TableCell>
              <TableCell className="text-right text-green-600 dark:text-green-400">
                {leaderboard.user.easySolved}
              </TableCell>
              <TableCell className="text-right text-yellow-600 dark:text-yellow-400">
                {leaderboard.user.mediumSolved}
              </TableCell>
              <TableCell className="text-right text-red-600 dark:text-red-400">
                {leaderboard.user.hardSolved}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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