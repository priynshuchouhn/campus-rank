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
import { Medal } from "lucide-react";

interface LeaderboardTableProps {
  users: User[];
  searchQuery: string;
}

export function LeaderboardTable({ users, searchQuery }: LeaderboardTableProps) {
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.totalSolved - a.totalSolved);

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
          {filteredUsers.map((user, index) => (
            <TableRow
              key={user.id}
              className="transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <TableCell className="font-medium">
                {index < 3 ? (
                  <Medal className={`h-5 w-5 ${getMedalColor(index)}`} />
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-right">{user.totalSolved}</TableCell>
              <TableCell className="text-right text-green-600 dark:text-green-400">
                {user.easySolved}
              </TableCell>
              <TableCell className="text-right text-yellow-600 dark:text-yellow-400">
                {user.mediumSolved}
              </TableCell>
              <TableCell className="text-right text-red-600 dark:text-red-400">
                {user.hardSolved}
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