import { TopPerformers } from "../components/ui/top-performers";
import Feed from "@/components/ui/feed";
import { getLeaderboard } from "@/lib/actions/leaderboard";


export default async function Home() {
  const leaderboard = await getLeaderboard();
  return (
    <main>
      <TopPerformers leaderboards={leaderboard} />
      <Feed leaderboards={leaderboard} />
    </main>
  );
}