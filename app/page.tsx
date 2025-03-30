import { TopPerformers } from "../components/ui/top-performers";
import Navbar from "@/components/ui/nav-bar";
import Feed from "@/components/ui/feed";

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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        
        <TopPerformers users={mockUsers} />
        
        <Feed users={mockUsers} />
      </div>
    </main>
  );
}