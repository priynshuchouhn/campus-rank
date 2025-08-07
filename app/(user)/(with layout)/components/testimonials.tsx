import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Developer",
    college: "TIMSCDR",
    quote:
      "Campus Rank's structured approach helped me solve 500+ problems systematically. The weekly goals kept me motivated throughout my preparation!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Software Developer",
    college: "TIMSCDR",
    quote:
      "The leaderboard feature made preparation competitive and fun. I could track my progress against peers from top colleges.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Software Developer",
    college: "TIMSCDR",
    quote:
      "MCQ practice modules were a game-changer for my aptitude rounds. The technical blogs provided real interview insights.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-background text-foreground">
      <div className="lg:container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Placed Students
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who landed their dream jobs using Campus Rank
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 border border-border backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-in-out dark:bg-background"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 dark:text-accent/70" />

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary dark:text-accent dark:fill-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground italic">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary dark:text-accent">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.college}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to write your own success story?
          </p>
          <Link href={'/dashboard'}>
          <div className="inline-flex items-center gap-2 cursor-pointer text-primary font-medium dark:text-accent">
            <span>Join 50+ students already preparing</span>
            <span className="animate-pulse">→</span>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};


export default TestimonialsSection
