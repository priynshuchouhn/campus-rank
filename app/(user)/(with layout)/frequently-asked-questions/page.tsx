import { Code, Target, Brain, Trophy, Shield, Rocket } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Campus Rank",
    description: "Find answers to common questions about Campus Rank, the student-focused coding platform for tracking DSA progress, personalized roadmaps, and college coding leaderboards.",
    keywords: "Campus Rank, coding platform, DSA progress, college leaderboard, technical interview preparation, coding roadmap",
};

const faqs = [
    {
        question: "What is Campus Rank?",
        answer: "Campus Rank is a student-focused coding platform that helps college students track their Data Structures and Algorithms (DSA) progress, follow personalized roadmaps, achieve weekly coding goals, and compete on coding leaderboards based on platforms like LeetCode, HackerRank, and GeeksforGeeks. It's built to support college placements and technical interview preparation.",
        icon: Code
    },
    {
        question: "Who can use Campus Rank?",
        answer: "Currently, Campus Rank is available exclusively to students from our college. In future versions, we plan to open access to students from other colleges and universities.",
        icon: Shield
    },
    {
        question: "How does the Campus Rank leaderboard work?",
        answer: "The Campus Rank leaderboard updates automatically based on your coding activity on LeetCode, HackerRank, and GeeksforGeeks. It ranks students by the number of DSA problems solved, providing a competitive environment to stay motivated and improve consistently.",
        icon: Trophy
    },
    {
        question: "What features does Campus Rank offer for students?",
        answer: "Campus Rank v1 includes: Personalized DSA Roadmaps, Weekly Coding Goal Tracker, Topic-Wise Practice Problems, Progress Charts and Visualizations, and College Coding Leaderboards.",
        icon: Target
    },
    {
        question: "How does Campus Rank track my DSA progress?",
        answer: "Your progress is tracked using public data from your coding platform profiles. You can also manually update your weekly goals and track completion of topics on the Campus Rank dashboard.",
        icon: Brain
    },
    {
        question: "How do I get started with Campus Rank?",
        answer: "To get started: 1. Sign up using your college email ID. 2. Enter your LeetCode, HackerRank, or GeeksforGeeks usernames. 3. Start exploring your dashboard, roadmap, and leaderboard rank.",
        icon: Rocket
    },
    {
        question: "Can I solve coding problems directly on Campus Rank?",
        answer: "As of Campus Rank v1, you can view DSA questions categorized by topic and be redirected to solve them on platforms like LeetCode or GFG. A built-in coding environment is planned for future releases.",
        icon: Code
    },
    {
        question: "Why should I use Campus Rank for DSA and placement prep?",
        answer: "Unlike generic platforms, Campus Rank is customized for your college. It helps you: compete with peers through local leaderboards, stay consistent with weekly targets, visualize your learning journey, and build discipline and focus during placement season.",
        icon: Target
    },
    {
        question: "How do I appear in the Top Rankers section?",
        answer: "Your position is determined by the number of coding problems solved and weekly activity. Solve consistently and complete roadmap tasks to be featured among the Top Campus Coders.",
        icon: Trophy
    },
    {
        question: "Is my data safe on Campus Rank?",
        answer: "Yes. We only use public usernames to fetch coding stats. No passwords or sensitive data are ever stored or accessed.",
        icon: Shield
    },
    {
        question: "How can I give feedback or suggest new features?",
        answer: "We welcome your feedback! You can use the Feedback section on the dashboard to: report bugs, suggest new features, and request improvements. Your feedback helps shape Campus Rank v2.",
        icon: Brain
    },
    {
        question: "Will Campus Rank support more features in the future?",
        answer: "Yes! Upcoming versions may include: Built-in coding interface, Peer discussions & forums, Placement deadlines and notifications, and Company-wise interview questions.",
        icon: Rocket
    }
];

// FAQ structured data generated at module scope so it is rendered on the server
const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function FAQ() {
    return (
        <>
        {/* JSON-LD for FAQ — placed in the document so it's included server-side */}
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        <div className="min-h-screen bg-background flex flex-col">
            {/* Hero Section */}
            <section aria-labelledby="faq-heading" className="relative bg-primary/5 py-16 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="container mx-auto px-4 text-center relative">
                    <h1 id="faq-heading" className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                        Everything you need to know about Campus Rank. Can&apos;t find what you&apos;re
                        looking for? Reach out to our support team.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section aria-label="FAQ Content" className="container mx-auto px-4 py-8">
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                            <AccordionTrigger className="text-left py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10">
                                        <faq.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                                    </div>
                                    <span className="font-medium">{faq.question}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {faqs.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            No questions found matching your search. Try different keywords or{" "}
                            <a
                                href="mailto:support@campusrank.com"
                                className="text-primary hover:underline"
                            >
                                contact support
                            </a>
                            .
                        </p>
                    </div>
                )}
            </section>

            {/* Additional related content for SEO */}
            <section aria-label="Related Resources" className="container mx-auto px-4 py-8 border-t">
                <h2 className="text-2xl font-bold mb-4 text-center">Related Resources</h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                    Explore more resources to enhance your coding journey and prepare for technical interviews
                    with Campus Rank&apos;s comprehensive tools and tracking capabilities.
                </p>
            </section>
        </div>
        </>
    );
}