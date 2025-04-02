"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Video,
    ChevronRight,
    BookOpen,
    Code,
    CheckCircle2,
    Star,
    AlertTriangle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

// Knowledge level options
const knowledgeLevels = [
    {
        id: "beginner",
        title: "Beginner",
        description: "New to DSA, starting from scratch",
        icon: "🌱",
    },
    {
        id: "intermediate",
        title: "Intermediate",
        description: "Familiar with basic concepts, solved some problems",
        icon: "🌿",
    },
    {
        id: "advanced",
        title: "Advanced",
        description: "Strong understanding, looking to master advanced topics",
        icon: "🌳",
    },
];

// All available topics for assessment
const allTopics = [
    {
        id: "arrays",
        title: "Arrays and Strings",
        category: "Data Structures",
    },
    {
        id: "linked-lists",
        title: "Linked Lists",
        category: "Data Structures",
    },
    {
        id: "trees",
        title: "Trees and Graphs",
        category: "Data Structures",
    },
    {
        id: "sorting",
        title: "Sorting Algorithms",
        category: "Algorithms",
    },
    {
        id: "searching",
        title: "Searching Algorithms",
        category: "Algorithms",
    },
    {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        category: "Algorithms",
    },
    {
        id: "recursion",
        title: "Recursion",
        category: "Concepts",
    },
    {
        id: "bit-manipulation",
        title: "Bit Manipulation",
        category: "Concepts",
    },
];

// Mock roadmap data structure
const generateRoadmap = (level: string, strongTopics: string[], weakTopics: string[]) => {
    // Prioritize weak topics first, then include others based on level
    const prioritizedTopics = [
        ...weakTopics,
        ...allTopics
            .filter((t) => !weakTopics.includes(t.id) && !strongTopics.includes(t.id))
            .map((t) => t.id),
        ...strongTopics,
    ];

    const roadmap = {
        weakPoints: weakTopics.map((topicId) => {
            const topic = allTopics.find((t) => t.id === topicId);
            return {
                id: topicId,
                title: topic?.title || "",
                description: `Strengthen your understanding of ${topic?.title}`,
                priority: "High",
                estimatedTime: "3 weeks",
                questions: [
                    {
                        id: 1,
                        title: `Basic ${topic?.title} Problem`,
                        difficulty: "Easy",
                        platform: "Solve",
                    },
                    {
                        id: 2,
                        title: `Advanced ${topic?.title} Problem`,
                        difficulty: "Medium",
                        platform: "Solve",
                    },
                ],
                resources: [
                    {
                        type: "video",
                        title: `${topic?.title} Fundamentals`,
                        url: `https://example.com/${topicId}-video`,
                        duration: "30 mins",
                    },
                    {
                        type: "article",
                        title: `Mastering ${topic?.title}`,
                        url: `https://example.com/${topicId}-article`,
                        readTime: "15 mins",
                    },
                ],
            };
        }),
        recommendedPath: prioritizedTopics.map((topicId) => {
            const topic = allTopics.find((t) => t.id === topicId);
            const isWeak = weakTopics.includes(topicId);
            const isStrong = strongTopics.includes(topicId);

            return {
                id: topicId,
                title: topic?.title || "",
                description: `${isWeak ? "Focus on mastering" : isStrong ? "Advanced practice in" : "Learn"} ${topic?.title}`,
                priority: isWeak ? "High" : isStrong ? "Low" : "Medium",
                estimatedTime: isWeak ? "3 weeks" : "2 weeks",
                questions: [
                    {
                        id: 1,
                        title: `${topic?.title} Implementation`,
                        difficulty: isWeak ? "Easy" : "Medium",
                        platform: "LeetCode",
                    },
                ],
                resources: [
                    {
                        type: "video",
                        title: `${isWeak ? "Basic" : "Advanced"} ${topic?.title}`,
                        url: `https://example.com/${topicId}-video`,
                        duration: "25 mins",
                    },
                ],
            };
        }),
    };

    return roadmap;
};

export default function RoadmapPage() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [step, setStep] = useState<"level" | "assessment" | "roadmap">("level");
    const [strongTopics, setStrongTopics] = useState<string[]>([]);
    const [weakTopics, setWeakTopics] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<any>(null);

    const handleLevelSelect = (level: string) => {
        setSelectedLevel(level);
        setStep("assessment");
    };

    const handleTopicToggle = (topicId: string, type: "strong" | "weak") => {
        if (type === "strong") {
            if (strongTopics.includes(topicId)) {
                setStrongTopics(strongTopics.filter((id) => id !== topicId));
            } else {
                setStrongTopics([...strongTopics, topicId]);
                setWeakTopics(weakTopics.filter((id) => id !== topicId));
            }
        } else {
            if (weakTopics.includes(topicId)) {
                setWeakTopics(weakTopics.filter((id) => id !== topicId));
            } else {
                setWeakTopics([...weakTopics, topicId]);
                setStrongTopics(strongTopics.filter((id) => id !== topicId));
            }
        }
    };

    const handleAssessmentComplete = () => {
        if (selectedLevel) {
            const generatedRoadmap = generateRoadmap(selectedLevel, strongTopics, weakTopics);
            setRoadmap(generatedRoadmap);
            setStep("roadmap");
        }
    };

    const renderTopicList = () => {
        const groupedTopics = allTopics.reduce((acc, topic) => {
            if (!acc[topic.category]) {
                acc[topic.category] = [];
            }
            acc[topic.category].push(topic);
            return acc;
        }, {} as Record<string, typeof allTopics>);

        return Object.entries(groupedTopics).map(([category, topics]) => (
            <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{category}</h3>
                <div className="space-y-4">
                    {topics.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                            <div className="flex-1">
                                <p className="font-medium">{topic.title}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={`strong-${topic.id}`}
                                        checked={strongTopics.includes(topic.id)}
                                        onCheckedChange={() => handleTopicToggle(topic.id, "strong")}
                                    />
                                    <Label htmlFor={`strong-${topic.id}`} className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        Strong
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={`weak-${topic.id}`}
                                        checked={weakTopics.includes(topic.id)}
                                        onCheckedChange={() => handleTopicToggle(topic.id, "weak")}
                                    />
                                    <Label htmlFor={`weak-${topic.id}`} className="flex items-center gap-1">
                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                        Need Practice
                                    </Label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    const renderRoadmap = () => {
        if (!roadmap) return null;

        return (
            <div className="space-y-8">
                {roadmap.weakPoints.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                                Focus Areas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="space-y-4">
                                {roadmap.weakPoints.map((topic: any) => (
                                    <AccordionItem key={topic.id} value={topic.id}>
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="destructive">High Priority</Badge>
                                                <span>{topic.title}</span>
                                                <Badge>{topic.estimatedTime}</Badge>
                                                <Link
                                                    href={`/roadmap/topics/${topic.id}`}
                                                    className="text-xs text-primary flex items-center hover:underline ml-auto"
                                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                                >
                                                    View Topic Details <ChevronRight className="h-3 w-3 ml-1" />
                                                </Link>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-6 p-4">
                                                <div>
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <Code className="h-4 w-4" />
                                                        Practice Questions
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {topic.questions.map((question: any) => (
                                                            <li
                                                                key={question.id}
                                                                className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <ChevronRight className="h-4 w-4" />
                                                                    {question.title}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline">
                                                                        {question.platform}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant={
                                                                            question.difficulty === "Easy"
                                                                                ? "success"
                                                                                : question.difficulty === "Medium"
                                                                                    ? "warning"
                                                                                    : "destructive"
                                                                        }
                                                                    >
                                                                        {question.difficulty}
                                                                    </Badge>
                                                                    <Link
                                                                        href={`/practice?topic=${topic.id}&problem=${question.id}`}
                                                                        className="text-sm text-primary-foreground bg-primary px-2 py-1 rounded hover:bg-primary/90 transition-colors"
                                                                    >
                                                                        Practice
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4" />
                                                        Learning Resources
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {topic.resources.map((resource: any, index: number) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {resource.type === "video" ? (
                                                                        <Video className="h-4 w-4" />
                                                                    ) : (
                                                                        <FileText className="h-4 w-4" />
                                                                    )}
                                                                    {resource.title}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline">
                                                                        {resource.type === "video"
                                                                            ? resource.duration
                                                                            : resource.readTime}
                                                                    </Badge>
                                                                    <Button variant="ghost" size="sm" asChild>
                                                                        <a
                                                                            href={resource.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            View
                                                                        </a>
                                                                    </Button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                            Complete Learning Path
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="space-y-4">
                            {roadmap.recommendedPath.map((topic: any) => (
                                <AccordionItem key={topic.id} value={topic.id}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4">
                                            <Badge
                                                variant={
                                                    topic.priority === "High"
                                                        ? "destructive"
                                                        : topic.priority === "Medium"
                                                            ? "warning"
                                                            : "success"
                                                }
                                            >
                                                {topic.priority} Priority
                                            </Badge>
                                            <span>{topic.title}</span>
                                            <Badge>{topic.estimatedTime}</Badge>
                                            <Link
                                                href={`/roadmap/topics/${topic.id}`}
                                                className="text-xs text-primary flex items-center hover:underline ml-auto"
                                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                            >
                                                View Topic Details <ChevronRight className="h-3 w-3 ml-1" />
                                            </Link>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-6 p-4">
                                            <div>
                                                <Link href={`/roadmap/topics/${topic.id}`}>
                                                    <h3 className="text-lg font-semibold mb-2 hover:text-primary hover:underline">
                                                        {topic.title}
                                                    </h3>
                                                </Link>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Code className="h-4 w-4" />
                                                    Practice Questions
                                                </h4>
                                                <ul className="space-y-2">
                                                    {topic.questions.map((question: any) => (
                                                        <li
                                                            key={question.id}
                                                            className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <ChevronRight className="h-4 w-4" />
                                                                {question.title}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline">
                                                                    {question.platform}
                                                                </Badge>
                                                                <Badge
                                                                    variant={
                                                                        question.difficulty === "Easy"
                                                                            ? "success"
                                                                            : question.difficulty === "Medium"
                                                                                ? "warning"
                                                                                : "destructive"
                                                                    }
                                                                >
                                                                    {question.difficulty}
                                                                </Badge>
                                                                <Link
                                                                    href={`/practice?topic=${topic.id}&problem=${question.id}`}
                                                                    className="text-sm text-primary-foreground bg-primary px-2 py-1 rounded hover:bg-primary/90 transition-colors"
                                                                >
                                                                    Practice
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4" />
                                                    Learning Resources
                                                </h4>
                                                <ul className="space-y-2">
                                                    {topic.resources.map((resource: any, index: number) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {resource.type === "video" ? (
                                                                    <Video className="h-4 w-4" />
                                                                ) : (
                                                                    <FileText className="h-4 w-4" />
                                                                )}
                                                                {resource.title}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline">
                                                                    {resource.type === "video"
                                                                        ? resource.duration
                                                                        : resource.readTime}
                                                                </Badge>
                                                                <Button variant="ghost" size="sm" asChild>
                                                                    <a
                                                                        href={resource.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        View
                                                                    </a>
                                                                </Button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">DSA Learning Roadmap</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/roadmap/topics">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Browse Topics
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/practice">
                                <Code className="h-4 w-4 mr-2" />
                                Practice
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                            <Progress
                                value={
                                    step === "level"
                                        ? 33
                                        : step === "assessment"
                                            ? 66
                                            : 100
                                }
                            />
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Step {step === "level" ? "1" : step === "assessment" ? "2" : "3"} of 3
                        </span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === "level" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {knowledgeLevels.map((level) => (
                                <Card
                                    key={level.id}
                                    className="cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => handleLevelSelect(level.id)}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <span className="text-2xl">{level.icon}</span>
                                            {level.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{level.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    )}

                    {step === "assessment" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Topic Assessment</CardTitle>
                                    <p className="text-muted-foreground">
                                        Select your strong topics and areas where you need more practice
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {renderTopicList()}
                                    <div className="flex justify-end gap-4 mt-6">
                                        <Button variant="outline" onClick={() => setStep("level")}>
                                            Back
                                        </Button>
                                        <Button onClick={handleAssessmentComplete}>
                                            Generate Roadmap
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === "roadmap" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep("assessment")}
                                >
                                    Modify Assessment
                                </Button>
                                <Badge variant="secondary" className="text-lg">
                                    {knowledgeLevels.find((l) => l.id === selectedLevel)?.title} Level
                                </Badge>
                            </div>
                            {renderRoadmap()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}