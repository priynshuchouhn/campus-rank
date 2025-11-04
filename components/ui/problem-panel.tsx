"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
    Heart,
    Share,
    Moon,
    Sun,
    ThumbsUp,
    ThumbsDown,
    PanelLeftClose,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getDifficultyColor } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { sampleQuestions } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface Example {
    input: string;
    output: string;
    explanation: string;
}

interface Question {
    id: number;
    slug:string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    tags: string[];
    description: string;
    constraints: string[];
    examples: Example[];
    hints: string[];
}

interface ProblemPanelProps {
    selectedProblem: Question;
    problems: Question[];
}

export function ProblemPanel({ selectedProblem, problems }: ProblemPanelProps) {
    const router = useRouter();
    const handleProblemChange = (problemId: string) => {
        const problem = problems.find(p => p.slug === problemId);
        if (problem) {
            router.push(`/code/${problemId}`);
        }
    };

    return (
        <div className="h-full flex flex-col bg-background">
            {/* Header */}
            <div className="border-b px-4 py-3 flex items-center justify-between bg-background">
                <div className="flex items-center space-x-3">
                    <Sheet>
                        <SheetTrigger>
                                <PanelLeftClose className="h-4 w-4" />
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <div className="border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
                                <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
                                    <h3 className="font-medium">Problems</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {sampleQuestions.map(problem => (
                                            <li key={problem.id} className={`p-4 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedProblem.id === problem.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`} onClick={() => handleProblemChange(problem.slug)}>
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium">{problem.title}</h3>
                                                    <Badge>
                                                        {problem.difficulty}
                                                    </Badge>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <h1 className="text-lg font-medium">
                        {selectedProblem.id}. {selectedProblem.title}
                    </h1>
                    <span className={`text-sm font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                        {selectedProblem.difficulty}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <Tabs defaultValue="description" className="h-full flex flex-col">
                    <div className="border-b px-4">
                        <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
                            <TabsTrigger value="description">
                                Description
                            </TabsTrigger>
                            <TabsTrigger value="editorial" >
                                Editorial
                            </TabsTrigger>
                            <TabsTrigger value="submissions">
                                Submissions
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="h-[90vh] overflow-scroll pb-8 scrollbar-none">
                        <TabsContent value="description" className="h-full m-0">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-6">
                                    {/* Problem Description */}
                                    <div>
                                        <p className="text-sm leading-relaxed whitespace-pre-line text-foreground">
                                            {selectedProblem.description}
                                        </p>
                                    </div>

                                    {/* Examples */}
                                    <div>
                                        {selectedProblem.examples.map((example, index) => (
                                            <div key={index} className="mb-4">
                                                <h4 className="font-medium text-sm mb-2">Example {index + 1}:</h4>
                                                <Card className="bg-muted/30">
                                                    <CardContent className="p-3 space-y-2">
                                                        <div>
                                                            <span className="font-medium text-sm">Input: </span>
                                                            <code className="text-sm font-mono">{example.input}</code>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-sm">Output: </span>
                                                            <code className="text-sm font-mono">{example.output}</code>
                                                        </div>
                                                        {example.explanation && (
                                                            <div>
                                                                <span className="font-medium text-sm">Explanation: </span>
                                                                <span className="text-sm">{example.explanation}</span>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Constraints */}
                                    <div>
                                        <h4 className="font-medium text-sm mb-2">Constraints:</h4>
                                        <ul className="space-y-1">
                                            {selectedProblem.constraints.map((constraint, index) => (
                                                <li key={index} className="text-sm text-muted-foreground">
                                                    • <code className="text-xs">{constraint}</code>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <h4 className="font-medium text-sm mb-2">Tags:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProblem.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hints */}
                                    {selectedProblem.hints.length > 0 && (
                                        <div>
                                            {/* <h4 className="font-medium text-sm mb-3">Hints:</h4> */}
                                            <div className="space-y-2">
                                                <Accordion type="single" collapsible>
                                                    {selectedProblem.hints.map((hint, index) => (
                                                        <AccordionItem value={`${index}`} key={hint}>
                                                            <AccordionTrigger className="text-sm font-semibold">
                                                                Hint {index + 1}
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="mt-3 space-y-3">
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {hint}
                                                                    </p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="editorial" className="h-full m-0">
                            <ScrollArea className="h-full">
                                <div className="p-4">
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>Editorial solution will be available after submission</p>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="submissions" className="h-full m-0">
                            <ScrollArea className="h-full">
                                <div className="p-4">
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>No submissions yet</p>
                                        <p className="text-sm mt-1">Submit your solution to see it here</p>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}