import {
  BookOpen,
  Target,
  Trophy,
  Brain,
  Code,
  PenTool,
  Users
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: BookOpen,
    title: "Personalized DSA Roadmap",
    description: "Structured learning paths tailored to your current level and placement goals."
  },
  {
    icon: Target,
    title: "Weekly Goals & Progress",
    description: "Set achievable targets and track your coding journey with detailed analytics."
  },
  {
    icon: Trophy,
    title: "Live Leaderboards",
    description: "Compete with peers using real stats from LeetCode, HackerRank, and GeeksforGeeks."
  },
  {
    icon: Brain,
    title: "MCQ Practice Modules",
    description: "Master aptitude and CS fundamentals with our comprehensive question bank.",
    badge: 'NEW',
  },
  {
    icon: Code,
    title: "Coding Contests",
    description: "Participate in regular contests to simulate real interview environments.",
    badge:'COMING SOON'
  },
  {
    icon: PenTool,
    title: "Technical Blogs",
    description: "Learn from peer experiences and mentor insights on placement strategies."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-background text-foreground">
      <div className="lg:container mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ace Placements
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines the best of competitive programming 
            with real placement preparation needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:scale-[1.03] transition-transform bg-card/70 border border-border backdrop-blur-sm relative dark:bg-background"
            >
              <CardHeader>
                {feature.badge && (
                  <Badge
                    variant={feature.badge === "NEW" ? "secondary" : "warning"}
                    className="absolute -top-2 -right-5 rotate-3"
                  >
                    {feature.badge}
                  </Badge>
                )}
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-xl dark:text-accent">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-white">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Trusted by Thousands</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["100+", "Questions Solved Daily"],
              ["50+", "Active Students"],
              ["5+", "Companies Covered"],
              ["~90%", "Placement Success Rate"]
            ].map(([value, label], i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl font-bold text-primary dark:text-accent">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
