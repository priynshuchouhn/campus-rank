"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Video, FileText, Code, ArrowLeft, ExternalLink, BookOpen, Check, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for topics
const mockTopics = [
    {
        id: "arrays",
        title: "Arrays and Strings",
        description: "Arrays are a fundamental data structure that store elements of the same type in contiguous memory locations. They provide O(1) access to elements by index but have limitations for insertions and deletions. Strings are sequences of characters, often implemented as arrays of characters with special properties.",
        resources: [
            {
                id: "1",
                title: "Introduction to Arrays",
                url: "https://example.com/intro-to-arrays",
                type: "ARTICLE"
            },
            {
                id: "2",
                title: "Array Data Structure",
                url: "https://example.com/array-video",
                type: "VIDEO"
            },
            {
                id: "3",
                title: "String Manipulation Techniques",
                url: "https://example.com/string-techniques",
                type: "ARTICLE"
            }
        ],
        problems: [
            {
                id: "two-sum",
                title: "Two Sum",
                difficulty: "Easy",
                description: "Find two numbers in an array that add up to a target value.",
                platform: "LeetCode",
                completion: 0
            },
            {
                id: "valid-anagram",
                title: "Valid Anagram",
                difficulty: "Easy",
                description: "Determine if a string is an anagram of another string.",
                platform: "LeetCode",
                completion: 50
            },
            {
                id: "reverse-string",
                title: "Reverse String",
                difficulty: "Easy",
                description: "Reverse all the characters in a string.",
                platform: "LeetCode",
                completion: 100
            }
        ],
        subtopics: [
            "Array Traversal",
            "Array Manipulation",
            "String Methods",
            "Two-Pointer Technique",
            "Sliding Window"
        ],
        prerequisites: ["Basic Programming", "Variables and Data Types"],
        nextTopics: ["Linked Lists", "Hash Tables"],
        progressStats: {
            completion: 60,
            problemsSolved: 6,
            totalProblems: 10,
            timeSpent: "4h 30m"
        }
    },
    // Other topics would be defined here
];

export default function TopicDetail() {
    const params = useParams();
    const router = useRouter();
    const topicId = params.id as string;
    const [activeTab, setActiveTab] = useState("overview");

    // Find the topic by ID from our mock data
    const topic = mockTopics.find(t => t.id === topicId) || mockTopics[0];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return '';
        }
    };

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
                            <Link href={`/practice?topic=${topic.id}`}>
                                <Button>
                                    Practice Now <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>What&apos;s Next?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">After mastering this topic, you can explore these related topics:</p>
                            <div className="flex flex-wrap gap-2">
                                {topic.nextTopics.map((nextTopic, i) => (
                                    <Button key={i} variant="outline" asChild>
                                        <Link href={`/roadmap/topics/${nextTopic.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {nextTopic}
                                        </Link>
                                    </Button>
                                ))}
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
                                            <Link href={`/practice?topic=${topic.id}&problem=${problem.id}`}>
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
                                            </Link>
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