import { TopPerformers } from "../components/ui/top-performers";
import Navbar from "@/components/ui/nav-bar";
import Feed from "@/components/ui/feed";

const mockUsers = [
  {
    id: "1",
    name: "Amit Sharma",
    email: "amit@example.com",
    leetcodeUsername: "amit_leetcode",
    hackerrankUsername: "amit_hackerrank",
    gfgUsername: "amit_gfg",
    totalSolved: 350,
    easySolved: 150,
    mediumSolved: 120,
    hardSolved: 80,
    image: "",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    leetcodeUsername: "priya_leetcode",
    hackerrankUsername: "priya_hackerrank",
    gfgUsername: "priya_gfg",
    totalSolved: 420,
    easySolved: 180,
    mediumSolved: 160,
    hardSolved: 80,
    image: "",
  },
  {
    id: "3",
    name: "Raj Kumar",
    email: "raj@example.com",
    leetcodeUsername: "raj_leetcode",
    hackerrankUsername: "raj_hackerrank",
    gfgUsername: "raj_gfg",
    totalSolved: 380,
    easySolved: 160,
    mediumSolved: 140,
    hardSolved: 80,
    image: "",
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