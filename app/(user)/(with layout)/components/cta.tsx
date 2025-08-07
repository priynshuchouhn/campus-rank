import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Star, User } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-background text-foreground">
      <div className="lg:container mx-auto">
        <div className="relative rounded-3xl p-12 md:p-16 text-center bg-gradient-to-r from-primary to-secondary text-white overflow-hidden dark:from-background dark:to-background">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-lg rotate-12"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border border-white/30 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/30 rounded-lg -rotate-12"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 border border-white/30 rounded-full"></div>
          </div>

          <div className="relative z-10 lg:max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Rocket className="h-4 w-4" />
              Start Your Journey Today
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Start Your Journey to{" "}
              <span className="text-secondary font-bold">Placement Success</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of students who&apos;ve transformed their coding skills 
              and landed their dream jobs. Your placement success story starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={'/dashboard'}>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold group dark:text-white"
              >
                Join Campus Rank Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
              {/* <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white bg-white/10 backdrop-blur-sm"
              >
                View Demo
              </Button> */}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30"
                    >
                        <User className="w-4 h-4"/>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/80">50+ students</span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-white/80 ml-2">4.9/5 rating</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-center text-white/90">
              <div>
                <div className="text-2xl font-bold">~90%</div>
                <div className="text-xs text-white/70">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5+</div>
                <div className="text-xs text-white/70">Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-xs text-white/70">Problems</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-white/70">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection
