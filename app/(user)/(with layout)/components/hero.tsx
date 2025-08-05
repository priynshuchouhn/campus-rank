import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Target, Users } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-background flex items-center justify-center lg:px-4 lg:py-8">
      <div className="lg:container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-accent px-4 py-2 rounded-full text-sm font-medium">
              <Trophy className="h-4 w-4" />
              Trusted by 50+ Students
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Track. Practice.{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 dark:from-accent dark:to-accent/70 bg-clip-text text-transparent">
                Compete.
              </span>{" "}
              Get Placed.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              One-stop platform for college students to master DSA, practice coding, 
              and crack top tech placements. Built for students, by students.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Join Campus Rank Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Features
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary dark:text-accent">4K+</div>
              <div className="text-sm text-muted-foreground">Questions Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary dark:text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary dark:text-accent">90%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden bg-card shadow-xl">
            <Image
              src={'/hero-image.jpg'}
              alt="Students coding and preparing for placements"
              className="w-full h-auto"
              width={1200}
              height={400}
            />

            {/* Floating Cards */}
            <div className="absolute top-4 right-4 bg-card rounded-lg p-3 shadow-md animate-bounce">
              <Target className="h-6 w-6 text-primary mb-1 dark:text-accent" />
              <div className="text-xs font-medium text-foreground">Daily Goal</div>
              <div className="text-xs text-muted-foreground">3/5 Problems</div>
            </div>

            <div className="absolute bottom-4 left-4 bg-card rounded-lg p-3 shadow-md ">
              <Users className="h-6 w-6 text-primary mb-1 dark:text-accent" />
              <div className="text-xs font-medium text-foreground">Rank #42</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
