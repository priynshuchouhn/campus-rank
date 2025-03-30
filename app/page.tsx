"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LeaderboardTable } from "../components/ui/leaderboard-table";
import { Search } from "lucide-react";
import { TopPerformers } from "../components/ui/top-performers";
import Navbar from "@/components/ui/nav-bar";

const mockUsers = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit@example.com",
    leetcode_username: "amit_leetcode",
    hackerrank_username: "amit_hackerrank",
    gfg_username: "amit_gfg",
    total_solved: 350,
    easy: 150,
    medium: 120,
    hard: 80,
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    leetcode_username: "priya_leetcode",
    hackerrank_username: "priya_hackerrank",
    gfg_username: "priya_gfg",
    total_solved: 420,
    easy: 180,
    medium: 160,
    hard: 80,
  },
  {
    id: 3,
    name: "Raj Kumar",
    email: "raj@example.com",
    leetcode_username: "raj_leetcode",
    hackerrank_username: "raj_hackerrank",
    gfg_username: "raj_gfg",
    total_solved: 380,
    easy: 160,
    medium: 140,
    hard: 80,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        
        <TopPerformers users={mockUsers} />
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <LeaderboardTable users={mockUsers} searchQuery={searchQuery} />
      </div>
    </main>
  );
}