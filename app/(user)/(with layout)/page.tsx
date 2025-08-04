import { TopPerformers } from "../../../components/ui/top-performers";
import Feed from "@/components/ui/feed";
import { getLeaderboard } from "@/lib/actions/leaderboard";
import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
import WhyCampusRank from "./components/why-us";
import TestimonialsSection from "./components/testimonials";
import FAQSection from "./components/faq";
import CTASection from "./components/cta";
import { LeaderboardPreview } from "./components/leaderboard-preview";


export default async function Home() {
  const leaderboard = await getLeaderboard();
  return (
    // <main>
    //   <TopPerformers leaderboards={leaderboard} />
    //   <Feed leaderboards={leaderboard} />
    // </main>
    <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <LeaderboardPreview leaderboard={leaderboard} />
        <div id="why-us">
          <WhyCampusRank />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <CTASection />
      </main>
  );
}