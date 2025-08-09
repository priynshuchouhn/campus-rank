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
import { Lock, Medal, Trophy } from "lucide-react";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./pagination";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import AuthDialog from "./auth-dialog";
import { Button } from "./button";

interface LeaderboardTableProps {
  leaderboards: (LeaderboardStats & { user: any })[];
  searchQuery?: string;
  isLoggedIn?: boolean
}

export function LeaderboardTable({ leaderboards, searchQuery = "", isLoggedIn }: LeaderboardTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(leaderboards.length / 15));

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
      {/* <Table>
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
      </Table> */}
      <Card className=" border-0 bg-card/50 backdrop-blur-sm dark:bg-background">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="dark:text-foreground text-left p-4 font-medium">Rank</th>
                  <th className="dark:text-foreground text-left p-4 font-medium">Name</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">Total Solved</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">LC Easy</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">LC Medium</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">LC Hard</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">GFG Solved</th>
                  <th className="dark:text-foreground text-center p-4 font-medium">HR Badges</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((leaderboard) => (
                  <tr key={leaderboard.id} className="border-b border-border hover:bg-muted/50 transition-colors dark:hover:bg-primary/10">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {leaderboard.globalRank! <= 3 && (
                          <Trophy className={`h-4 w-4 ${leaderboard.globalRank === 1 ? 'text-yellow-500' :
                            leaderboard.globalRank === 2 ? 'text-gray-400' :
                              'text-orange-600'
                            }`} />
                        )}
                        <span className="font-medium dark:text-foreground">{leaderboard.globalRank}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link href={`/user/${leaderboard.user.username}`}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={leaderboard.user.image} alt={leaderboard.user.name} />
                            <AvatarFallback>{leaderboard.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium dark:text-foreground">{leaderboard.user.name}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline" className="font-mono">
                        {leaderboard.user.totalSolved}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-600 font-mono">{leaderboard.user.easySolved}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-600 font-mono">{leaderboard.user.mediumSolved}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-red-600 font-mono">{leaderboard.user.hardSolved}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-primary font-mono">
                        {leaderboard.user.gfgProfile?.solvedProblems || '__'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-orange-600 font-mono">{leaderboard.user.hackerrankProfile?.badges.length || 0}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {!isLoggedIn ? (
            <div className="p-6 text-center w-full">
              <div className="flex items-center justify-center gap-2 text-muted-foreground flex-col lg:flex-row">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Showing top 5 users only.</span>
                </div>
                <AuthDialog>
                  <Button variant="link" className="p-0 h-auto">
                    Sign in to view full rankings
                  </Button>
                </AuthDialog>
              </div>
            </div>
          ) :
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>}
        </CardFooter>
      </Card>

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