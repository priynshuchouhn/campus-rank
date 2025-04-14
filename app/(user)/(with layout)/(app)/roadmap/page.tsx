"use client";

import { useState, useEffect } from "react";
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
    Star,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

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


interface Roadmap {
    id: string;
    sections: Array<{
        id: string;
        title: string;
        order: number;
        topics: Array<{
            id: string;
            order: number;
            completed: boolean;
            predefinedTopic: {
                id: string;
                title: string;
                description: string | null;
                level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
                preRequisites: string[];
                subTopics: string[];
                resources: Array<{
                    id: string;
                    title: string | null;
                    url: string;
                    type: "VIDEO" | "ARTICLE";
                }>;
                predefinedSection: {
                    id: string;
                    title: string;
                    description: string | null;
                };
            };
        }>;
    }>;
}


export default function RoadmapPage() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [step, setStep] = useState<"level" | "assessment" | "roadmap">("level");
    const [strongTopics, setStrongTopics] = useState<string[]>([]);
    const [weakTopics, setWeakTopics] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
    const [predefinedTopics, setPredefinedTopics] = useState<Array<{
        id: string;
        title: string;
        section: string;
    }>>([]);

    // Fetch existing roadmap and predefined topics
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roadmapResponse, topicsResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/predefined-topic`)
                ]);

                if (roadmapResponse.data.success && roadmapResponse.data.data) {
                    setRoadmap(roadmapResponse.data.data);
                    setStep("roadmap");
                }

                if (topicsResponse.data.success) {
                    console.log("Raw topics response:", topicsResponse.data);
                    const topics = topicsResponse.data.data.map((topic: any) => ({
                        id: topic.id,
                        title: topic.title,
                        section: topic.predefinedSection?.title || "Uncategorized"
                    }));
                    console.log("Processed topics:", topics);
                    setPredefinedTopics(topics);
                } else {
                    console.error("Failed to fetch topics:", topicsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const handleSectionToggle = (section: string, type: "strong" | "weak") => {
        const sectionTopics = predefinedTopics.filter(topic => topic.section === section);
        const sectionTopicIds = sectionTopics.map(topic => topic.id);

        if (type === "strong") {
            const allStrong = sectionTopicIds.every(id => strongTopics.includes(id));
            if (allStrong) {
                // If all are strong, remove them all
                setStrongTopics(strongTopics.filter(id => !sectionTopicIds.includes(id)));
            } else {
                // If not all are strong, add them all and remove from weak
                setStrongTopics([...new Set([...strongTopics, ...sectionTopicIds])]);
                setWeakTopics(weakTopics.filter(id => !sectionTopicIds.includes(id)));
            }
        } else {
            const allWeak = sectionTopicIds.every(id => weakTopics.includes(id));
            if (allWeak) {
                // If all are weak, remove them all
                setWeakTopics(weakTopics.filter(id => !sectionTopicIds.includes(id)));
            } else {
                // If not all are weak, add them all and remove from strong
                setWeakTopics([...new Set([...weakTopics, ...sectionTopicIds])]);
                setStrongTopics(strongTopics.filter(id => !sectionTopicIds.includes(id)));
            }
        }
    };

    const handleAssessmentComplete = async () => {
        if (!selectedLevel) {
            toast.error("Please select a knowledge level");
            return;
        }

        if (strongTopics.length === 0 && weakTopics.length === 0) {
            toast.error("Please select at least one topic as strong or needing practice");
            return;
        }

        setIsGeneratingRoadmap(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap`, {
                level: selectedLevel,
                strongTopics,
                weakTopics,
            });

            if (response.data.success) {
                setRoadmap(response.data.data);
                setStep("roadmap");
            } else {
                toast.error("Failed to create roadmap");
            }
        } catch (error) {
            console.error("Error creating roadmap:", error);
            toast.error("Failed to create roadmap");
        } finally {
            setIsGeneratingRoadmap(false);
        }
    };

    const renderTopicList = () => {
        if (predefinedTopics.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No topics available for assessment.</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Retry Loading Topics
                    </Button>
                </div>
            );
        }

        const groupedTopics = predefinedTopics.reduce((acc: Record<string, typeof predefinedTopics>, topic) => {
            const section = topic.section || "Uncategorized";
            if (!acc[section]) {
                acc[section] = [];
            }
            acc[section].push(topic);
            return acc;
        }, {});

        return Object.entries(groupedTopics).map(([section, topics]) => {
            const sectionTopicIds = topics.map(topic => topic.id);
            const allStrong = sectionTopicIds.every(id => strongTopics.includes(id));
            const allWeak = sectionTopicIds.every(id => weakTopics.includes(id));
            const someStrong = sectionTopicIds.some(id => strongTopics.includes(id));
            const someWeak = sectionTopicIds.some(id => weakTopics.includes(id));

            return (
                <div key={section} className="mb-6">
                    <div className="flex md:items-center flex-col sm:flex-row justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold">{section}</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`section-strong-${section}`}
                                    checked={allStrong}
                                    onCheckedChange={() => handleSectionToggle(section, "strong")}
                                />
                                <Label htmlFor={`section-strong-${section}`} className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    Strong
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`section-weak-${section}`}
                                    checked={allWeak}
                                    onCheckedChange={() => handleSectionToggle(section, "weak")}
                                />
                                <Label htmlFor={`section-weak-${section}`} className="flex items-center gap-1">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    Need Practice
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {topics.map((topic) => (
                            <div key={topic.id} className="flex md:items-center flex-col sm:flex-row justify-between gap-2 p-4 bg-card rounded-lg border">
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
                                            <span className="text-sm md:text-base md:block hidden">Strong</span>
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
                                            <span className="text-sm md:text-base md:block hidden">Need Practice</span>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    };

    const renderRoadmap = () => {
        if (!roadmap) return null;

        return (
            <div className="space-y-8">
                {roadmap.sections.map((section) => (
                    <Card key={section.id}>
                        <CardHeader>
                            <CardTitle className="md:text-2xl text-lg flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-blue-500" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="space-y-4">
                                {section.topics.map((topic) => (
                                    <AccordionItem key={topic.id} value={topic.id}>
                                        <AccordionTrigger>
                                            <div className="flex items-center justify-between gap-2">
                                                <Badge
                                                    variant={
                                                        topic.predefinedTopic.level === "BEGINNER"
                                                            ? "success"
                                                            : topic.predefinedTopic.level === "INTERMEDIATE"
                                                                ? "warning"
                                                                : "destructive"
                                                    }
                                                    className="text-xs md:text-sm"
                                                >
                                                    {topic.predefinedTopic.level}
                                                </Badge>
                                                <span className="text-sm md:text-base decoration-none">{topic.predefinedTopic.title}</span>
                                                <span className="text-sm md:text-base md:block hidden">
                                                    <Badge variant="outline">
                                                        {topic.predefinedTopic.subTopics.length} Subtopics
                                                    </Badge>
                                                </span>
                                                <span className="text-sm md:text-base md:block hidden">
                                                    <Link
                                                        href={`/roadmap/topics/${topic.id}`}
                                                        className="text-xs text-primary flex items-center hover:underline ml-auto"
                                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                                    >
                                                        View Topic Details <ChevronRight className="h-3 w-3 ml-1" />
                                                    </Link>
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-6 p-4">
                                                <div>
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <Code className="h-4 w-4" />
                                                        Learning Resources
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {topic.predefinedTopic.resources.map((resource) => (
                                                            <li
                                                                key={resource.id}
                                                                className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {resource.type === "VIDEO" ? (
                                                                        <Video className="h-4 w-4" />
                                                                    ) : (
                                                                        <FileText className="h-4 w-4" />
                                                                    )}
                                                                    {resource.title || "Untitled Resource"}
                                                                </div>
                                                                <Button variant="ghost" size="sm" asChild>
                                                                    <a
                                                                        href={resource.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        View
                                                                    </a>
                                                                </Button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4" />
                                                        Prerequisites
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {topic.predefinedTopic.preRequisites.map((prerequisite, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                                                            >
                                                                <ChevronRight className="h-4 w-4" />
                                                                {prerequisite}
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
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="md:px-4">
                <div className="flex justify-between md:items-center flex-col md:flex-row mb-8 gap-4">
                    <h1 className="md:text-4xl text-2xl font-bold">DSA Learning Roadmap</h1>
                    {roadmap && (
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/roadmap/topics">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Browse Topics
                                </Link>
                            </Button>
                            {/* <Button asChild>
                                <Link href="/practice">
                                    <Code className="h-4 w-4 mr-2" />
                                    Practice
                                </Link>
                            </Button> */}
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    <div className="flex md:items-center justify-center flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 md:w-1/2 w-full">
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
                                    <CardTitle className="md:text-2xl text-base">Topic Assessment</CardTitle>
                                    <p className="text-muted-foreground text-sm">
                                        Select your strong topics and areas where you need more practice
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {renderTopicList()}
                                    <div className="flex justify-end gap-4 mt-6">
                                        <Button variant="outline" onClick={() => setStep("level")}>
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleAssessmentComplete}
                                            disabled={isGeneratingRoadmap}
                                        >
                                            {isGeneratingRoadmap ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Generating Roadmap...
                                                </>
                                            ) : (
                                                "Generate Roadmap"
                                            )}
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
                            {/* <div className="flex items-center gap-4 mb-8">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep("assessment")}
                                >
                                    Modify Assessment
                                </Button>
                                <Badge variant="secondary" className="text-lg">
                                    {knowledgeLevels.find((l) => l.id === selectedLevel)?.title} Level
                                </Badge>
                            </div> */}
                            {renderRoadmap()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}