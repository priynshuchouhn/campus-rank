"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Code, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import toast from 'react-hot-toast';
import { PredefinedTopic, Resource } from "@prisma/client";
import { RenderMarkdown } from '@/components/ui/render-markdown';
interface Topic {
    id: string;
    title: string;
    description: string;
    sectionId: string;
    sectionName: string;
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    preRequisites: string[];
    subTopics: string[];
    resources: Array<{
        id: string;
        title: string;
        url: string;
        type: "VIDEO" | "ARTICLE";
    }>;
}

export default function TopicsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [topics, setTopics] = useState<(Topic & { predefinedTopic: PredefinedTopic & { resources: Resource[] }, section: { title: string } })[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasRoadmap, setHasRoadmap] = useState<boolean | null>(null);

    console.log(topics);

    // Fetch topics and check roadmap existence
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topicsResponse, roadmapResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap/topics`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap`)
                ]);

                if (topicsResponse.data.success) {
                    setTopics(topicsResponse.data.data);
                } else {
                    toast.error("Failed to fetch topics");
                }

                if (roadmapResponse.data.success) {
                    setHasRoadmap(!!roadmapResponse.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter topics based on search query and filters
    const filteredTopics = topics.filter(topic => {
        const matchesSearch = topic.predefinedTopic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || topic.sectionName === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || topic.level === difficultyFilter;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Get unique categories for filter
    const categories = ['all', ...new Set(topics.map(topic => topic.sectionName))];
    const difficulties = ['all', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (hasRoadmap === false) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">No Roadmap Found</h1>
                    <p className="text-muted-foreground">You need to create a roadmap before you can browse topics.</p>
                </div>
                <Button asChild>
                    <Link href="/roadmap">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Create Roadmap
                    </Link>
                </Button>
            </div>
        );
    }

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
                                <Badge>{topic.section.title}</Badge>
                                <Badge variant="outline">
                                    {topic.predefinedTopic.subTopics.length} Subtopics
                                </Badge>
                            </div>
                            <CardTitle>{topic.predefinedTopic.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">
                                <RenderMarkdown content={topic.predefinedTopic.description || ""} previewMode={true} />
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <Code className="h-4 w-4 text-blue-500" />
                                        <span>{topic.predefinedTopic.resources.length} Resources</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-yellow-500" />
                                        <span>{topic.predefinedTopic.preRequisites.length} Prerequisites</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                            {/* <Button variant="outline" asChild>
                                <Link href={`/practice?topic=${topic.id}`}>
                                    <Code className="h-4 w-4 mr-2" />
                                    Practice
                                </Link>
                            </Button> */}
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