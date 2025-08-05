import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, BookOpen, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Built by Students, for Students",
    description: "We understand your placement struggles because we've been there."
  },
  {
    icon: BookOpen,
    title: "Real Placement Focus",
    description: "Every feature is designed specifically for Indian placement scenarios."
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Progress",
    description: "Track your improvement with detailed analytics and insights."
  },
  {
    icon: CheckCircle,
    title: "Proven Success Stories",
    description: "Join thousands who've landed their dream jobs using our platform."
  }
];

const WhyCampusRank = () => {
  return (
    <section className="py-20 px-4 bg-muted/30 dark:bg-background">
      <div className="lg:container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Campus Rank?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We&apos;re not just another coding platform. We&apos;re your placement preparation 
                companion, built specifically for Indian college students.
              </p>
            </div>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-primary dark:text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Block */}
          <Card className="bg-muted/60 backdrop-blur-sm border border-border shadow-sm dark:bg-background">
            <CardContent className="p-6">
              <div className="font-mono text-sm space-y-2">
                <div className="text-muted-foreground">{"// Your placement journey"}</div>
                <div className="text-primary dark:text-accent">const</div>{" "}
                <span className="text-foreground">student = {`{`}</span>
                <div className="ml-4 space-y-1">
                  <div>
                    <span className="text-muted-foreground">name:</span>{" "}
                    <span className="text-green-500">&quot;You&quot;</span>,
                  </div>
                  <div>
                    <span className="text-muted-foreground">goal:</span>{" "}
                    <span className="text-green-500">&quot;Dream Job&quot;</span>,
                  </div>
                  <div>
                    <span className="text-muted-foreground">platform:</span>{" "}
                    <span className="text-green-500">&quot;Campus Rank&quot;</span>,
                  </div>
                  <div>
                    <span className="text-muted-foreground">result:</span>{" "}
                    <span className="text-green-500">&quot;Placed! 🎉&quot;</span>
                  </div>
                </div>
                <div className="text-foreground">{`};`}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyCampusRank;
