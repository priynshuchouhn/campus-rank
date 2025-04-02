"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    ChevronRight,
    Search,
    Filter,
    Code,
    Clock,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Mock data for topics - expanded to include more topics
const mockTopics = [
    {
        id: "arrays",
        title: "Arrays and Strings",
        description: "Arrays are a fundamental data structure that store elements of the same type in contiguous memory locations.",
        category: "Data Structures",
        difficulty: "Beginner",
        problems: 15,
        problemsSolved: 8,
        topicsCompleted: 3,
        totalTopics: 5,
        progressPercent: 60
    },
    {
        id: "linked-lists",
        title: "Linked Lists",
        description: "A linked list is a linear data structure where elements are stored in nodes that point to the next node.",
        category: "Data Structures",
        difficulty: "Beginner",
        problems: 12,
        problemsSolved: 4,
        topicsCompleted: 2,
        totalTopics: 4,
        progressPercent: 35
    },
    {
        id: "stacks-queues",
        title: "Stacks & Queues",
        description: "Stacks and queues are abstract data types with specified ways to access elements.",
        category: "Data Structures",
        difficulty: "Beginner",
        problems: 8,
        problemsSolved: 2,
        topicsCompleted: 1,
        totalTopics: 4,
        progressPercent: 20
    },
    {
        id: "trees",
        title: "Trees and Graphs",
        description: "Trees and graphs are non-linear data structures with hierarchical relationships between nodes.",
        category: "Data Structures",
        difficulty: "Intermediate",
        problems: 20,
        problemsSolved: 5,
        topicsCompleted: 2,
        totalTopics: 6,
        progressPercent: 25
    },
    {
        id: "sorting",
        title: "Sorting Algorithms",
        description: "Sorting algorithms are methods to arrange data in a particular order.",
        category: "Algorithms",
        difficulty: "Intermediate",
        problems: 10,
        problemsSolved: 6,
        topicsCompleted: 3,
        totalTopics: 5,
        progressPercent: 55
    },
    {
        id: "searching",
        title: "Searching Algorithms",
        description: "Searching algorithms are methods to find a target element within a data structure.",
        category: "Algorithms",
        difficulty: "Beginner",
        problems: 8,
        problemsSolved: 6,
        topicsCompleted: 2,
        totalTopics: 3,
        progressPercent: 70
    },
    {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        description: "Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems.",
        category: "Algorithms",
        difficulty: "Advanced",
        problems: 25,
        problemsSolved: 3,
        topicsCompleted: 1,
        totalTopics: 7,
        progressPercent: 15
    },
    {
        id: "recursion",
        title: "Recursion",
        description: "Recursion is a method where the solution depends on solutions to smaller instances of the same problem.",
        category: "Concepts",
        difficulty: "Intermediate",
        problems: 12,
        problemsSolved: 8,
        topicsCompleted: 3,
        totalTopics: 4,
        progressPercent: 65
    }
];

export default function TopicsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    // Filter topics based on search query and filters
    const filteredTopics = mockTopics.filter(topic => {
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || topic.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || topic.difficulty === difficultyFilter;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Get unique categories for filter
    const categories = ['all', ...new Set(mockTopics.map(topic => topic.category))];
    const difficulties = ['all', ...new Set(mockTopics.map(topic => topic.difficulty))];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Topics</h1>
                <p className="text-muted-foreground">Browse and learn from our curated list of data structures and algorithms topics</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search topics..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            {difficulties.map(difficulty => (
                                <SelectItem key={difficulty} value={difficulty}>
                                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map(topic => (
                    <Card key={topic.id} className="overflow-hidden flex flex-col h-full">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start mb-2">
                                <Badge>{topic.category}</Badge>
                                <Badge variant={
                                    topic.difficulty === "Beginner" ? "outline" :
                                        topic.difficulty === "Intermediate" ? "secondary" : "destructive"
                                }>
                                    {topic.difficulty}
                                </Badge>
                            </div>
                            <CardTitle>{topic.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span>{topic.topicsCompleted}/{topic.totalTopics} Subtopics</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Code className="h-4 w-4 text-blue-500" />
                                        <span>{topic.problemsSolved}/{topic.problems} Problems</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm flex justify-between">
                                        <span className="text-muted-foreground">Overall Progress</span>
                                        <span>{topic.progressPercent}%</span>
                                    </div>
                                    <Progress value={topic.progressPercent} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                            <Button variant="outline" asChild>
                                <Link href={`/practice?topic=${topic.id}`}>
                                    <Code className="h-4 w-4 mr-2" />
                                    Practice
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={`/roadmap/topics/${topic.id}`}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    View Topic
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No topics found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
} 