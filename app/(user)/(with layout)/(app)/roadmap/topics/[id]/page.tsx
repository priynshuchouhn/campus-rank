"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Video, FileText, Code, ArrowLeft, ExternalLink, BookOpen, Check, Clock, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import axios from "axios";
import toast from "react-hot-toast";

interface Topic {
    id: string;
    title: string;
    description: string;
    resources: Array<{
        id: string;
        title: string;
        url: string;
        type: "VIDEO" | "ARTICLE";
    }>;
    problems: Array<{
        id: string;
        title: string;
        difficulty: string;
        description: string;
        platform: string;
        completion: number;
    }>;
    subtopics: string[];
    prerequisites: string[];
    progressStats: {
        completion: number;
        problemsSolved: number;
        totalProblems: number;
        timeSpent: string;
    };
}

export default function TopicDetail() {
    const params = useParams();
    const router = useRouter();
    const topicId = params.id as string;
    const [activeTab, setActiveTab] = useState("overview");
    const [topic, setTopic] = useState<Topic | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap/topics/${topicId}`);
                if (response.data.success) {
                    setTopic(response.data.data);
                } else {
                    toast.error("Failed to fetch topic details");
                }
            } catch (error) {
                console.error("Error fetching topic:", error);
                toast.error("Failed to fetch topic details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopic();
    }, [topicId]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return '';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium">Topic not found</h3>
                <p className="text-muted-foreground mt-1">The requested topic could not be found</p>
                <Button variant="outline" className="mt-4" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">{topic.title}</h1>
                </div>
                <Link href="/roadmap/topics">
                    <Button variant="outline">Back to Topics</Button>
                </Link>
            </div>

            {/* Topic Progress Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Progress Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Overall Completion</p>
                            <div className="flex items-center gap-2">
                                <Progress value={topic.progressStats.completion} className="h-2" />
                                <span className="text-sm font-medium">{topic.progressStats.completion}%</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Problems Solved</p>
                                <p className="font-medium">{topic.progressStats.problemsSolved}/{topic.progressStats.totalProblems}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Time Spent</p>
                                <p className="font-medium">{topic.progressStats.timeSpent}</p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center">
                            {/* <Link href={`/practice?topic=${topic.id}`}>
                                <Button>
                                    Practice Now <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link> */}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="problems">Problems</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About This Topic</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{topic.description}</p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-base font-medium mb-2">Prerequisites</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {topic.prerequisites.map((prereq, i) => (
                                            <li key={i} className="text-sm">{prereq}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base font-medium mb-2">Subtopics</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.subtopics.map((subtopic, i) => (
                                            <Badge key={i} variant="outline">{subtopic}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Problems Tab */}
                <TabsContent value="problems">
                    <Card>
                        <CardHeader>
                            <CardTitle>Practice Problems</CardTitle>
                            <CardDescription>Solve these problems to reinforce your understanding</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {topic.problems.map((problem) => (
                                    <li key={problem.id} className="flex items-center justify-between p-3 border rounded-md">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium">{problem.title}</h3>
                                                <Badge className={getDifficultyColor(problem.difficulty)}>
                                                    {problem.difficulty}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {problem.platform}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{problem.description}</p>
                                        </div>
                                        <div className="ml-4 flex items-center gap-4">
                                            {problem.completion > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Progress value={problem.completion} className="h-2 w-20" />
                                                    <span className="text-xs font-medium">{problem.completion}%</span>
                                                </div>
                                            )}
                                            {/* <Link href={`/practice?topic=${topic.id}&problem=${problem.id}`}>
                                                <Button variant={problem.completion === 100 ? "outline" : "default"} size="sm">
                                                    {problem.completion === 100 ? (
                                                        <>
                                                            <Check className="h-4 w-4 mr-1" />
                                                            Completed
                                                        </>
                                                    ) : (
                                                        <>
                                                            {problem.completion > 0 ? "Continue" : "Practice"}
                                                        </>
                                                    )}
                                                </Button>
                                            </Link> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources">
                    <Card>
                        <CardHeader>
                            <CardTitle>Learning Resources</CardTitle>
                            <CardDescription>Read articles and watch videos to learn this topic</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {topic.resources.map((resource) => (
                                    <li key={resource.id} className="flex items-start gap-3 p-3 border rounded-md">
                                        {resource.type === 'VIDEO' ? (
                                            <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                                        ) : (
                                            <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-medium">{resource.title}</h3>
                                            <div className="mt-1 flex items-center">
                                                <Badge variant={resource.type === 'VIDEO' ? 'secondary' : 'outline'}>
                                                    {resource.type === 'VIDEO' ? 'Video' : 'Article'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" asChild>
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 