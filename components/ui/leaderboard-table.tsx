"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardStats } from "@prisma/client";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./pagination";
import { useState } from "react";

interface LeaderboardTableProps {
  leaderboards: (LeaderboardStats & {user:any})[];
  searchQuery: string;
}

export function LeaderboardTable({ leaderboards, searchQuery }: LeaderboardTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(leaderboards.length / 15));
  console.log(leaderboards);

  const filteredUsers = leaderboards
    .filter((leaderboard) =>
      leaderboard.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (!a.globalRank) return 1;
      if (!b.globalRank) return -1;
      return a.globalRank - b.globalRank;
    });

  const startIndex = (currentPage - 1) * 15;
  const endIndex = startIndex + 15;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Total Solved</TableHead>
            <TableHead className="text-center">LC Easy</TableHead>
            <TableHead className="text-center">LC Medium</TableHead>
            <TableHead className="text-center">LC Hard</TableHead>
            <TableHead className="text-center">GFG Solved </TableHead>
            <TableHead className="text-center">HR Badges</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((leaderboard, index) => (
            <TableRow
              key={leaderboard.user.id}
              className="transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <TableCell className="font-medium">
                {leaderboard?.globalRank !== null && leaderboard?.globalRank <= 3 ? (
                  <Medal className={`h-5 w-5 ${getMedalColor(leaderboard?.globalRank)}`} />
                ) : (
                  leaderboard?.globalRank !== null ? leaderboard?.globalRank : index+startIndex+1
                )}
              </TableCell>
              <TableCell><Link href={`/user/${leaderboard.user.username}`}>{leaderboard.user.name}</Link></TableCell>
              <TableCell className="text-center">{leaderboard.user.totalSolved}</TableCell>
              <TableCell className="text-center text-green-600 dark:text-green-400">
                {leaderboard.user.easySolved}
              </TableCell>
              <TableCell className="text-center text-yellow-600 dark:text-yellow-400">
                {leaderboard.user.mediumSolved}
              </TableCell>
              <TableCell className="text-center text-red-600 dark:text-red-400">
                {leaderboard.user.hardSolved}
              </TableCell>
              <TableCell className="text-center">{leaderboard.user.gfgProfile?.solvedProblems || 0}</TableCell>
              <TableCell className="text-center">{leaderboard.user.hackerrankProfile?.badges.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink isActive={currentPage === index+1} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div> 
  );
}

function getMedalColor(index: number): string {
  switch (index) {
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "";
  }
}