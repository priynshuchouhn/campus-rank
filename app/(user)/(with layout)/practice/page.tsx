"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Play, Check, Clock, BookOpen, Code, ArrowRight, ThumbsUp, AlertCircle, LightbulbIcon, ListChecks, Maximize, Minimize, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

interface Problem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    constraints: string[];
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    topic: string;
    hint?: string;
    solution?: string;
}

interface Topic {
    id: string;
    title: string;
    problems: Problem[];
}

// Mock data for topics and problems
const mockTopics: Topic[] = [
    {
        id: "arrays",
        title: "Arrays and Strings",
        problems: [
            {
                id: "two-sum",
                title: "Two Sum",
                difficulty: "Easy",
                description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
                constraints: [
                    "2 <= nums.length <= 10^4",
                    "-10^9 <= nums[i] <= 10^9",
                    "-10^9 <= target <= 10^9",
                    "Only one valid answer exists."
                ],
                examples: [
                    {
                        input: "nums = [2,7,11,15], target = 9",
                        output: "[0,1]",
                        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                    },
                    {
                        input: "nums = [3,2,4], target = 6",
                        output: "[1,2]"
                    }
                ],
                topic: "Arrays",
                hint: "Try using a hash map to store the values you've seen so far along with their indices.",
                solution: "function twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}"
            },
            {
                id: "valid-anagram",
                title: "Valid Anagram",
                difficulty: "Easy",
                description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
                constraints: [
                    "1 <= s.length, t.length <= 5 * 10^4",
                    "s and t consist of lowercase English letters."
                ],
                examples: [
                    {
                        input: 's = "anagram", t = "nagaram"',
                        output: "true"
                    },
                    {
                        input: 's = "rat", t = "car"',
                        output: "false"
                    }
                ],
                topic: "Strings",
                hint: "Try using a character frequency counter or sorting.",
                solution: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  \n  const charCount = {};\n  \n  // Count characters in s\n  for (let char of s) {\n    charCount[char] = (charCount[char] || 0) + 1;\n  }\n  \n  // Decrement for characters in t\n  for (let char of t) {\n    if (!charCount[char]) return false;\n    charCount[char]--;\n  }\n  \n  return true;\n}"
            }
        ]
    },
    {
        id: "linked-lists",
        title: "Linked Lists",
        problems: [
            {
                id: "reverse-linked-list",
                title: "Reverse Linked List",
                difficulty: "Easy",
                description: "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nA linked list can be reversed either iteratively or recursively. Could you implement both?",
                constraints: [
                    "The number of nodes in the list is the range [0, 5000]",
                    "-5000 <= Node.val <= 5000"
                ],
                examples: [
                    {
                        input: "head = [1,2,3,4,5]",
                        output: "[5,4,3,2,1]"
                    },
                    {
                        input: "head = [1,2]",
                        output: "[2,1]"
                    }
                ],
                topic: "Linked Lists",
                hint: "Keep track of the previous node as you iterate through the list.",
                solution: "function reverseList(head) {\n  let prev = null;\n  let current = head;\n  \n  while (current !== null) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  \n  return prev;\n}"
            }
        ]
    }
];

const DEFAULT_JAVASCRIPT_CODE = `function solution(nums, target) {
  // Write your solution here
  
}

// Example usage:
// const result = solution([2, 7, 11, 15], 9);
// console.log(result); // Expected: [0, 1]
`;

const DEFAULT_PYTHON_CODE = `def solution(nums, target):
    # Write your solution here
    pass

# Example usage:
# result = solution([2, 7, 11, 15], 9)
# print(result) # Expected: [0, 1]
`;

const DEFAULT_JAVA_CODE = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}

// Example usage:
// Solution sol = new Solution();
// int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
// System.out.println("[" + result[0] + "," + result[1] + "]"); // Expected: [0, 1]
`;

const languages = [
    { id: 'javascript', name: 'JavaScript', default: DEFAULT_JAVASCRIPT_CODE },
    { id: 'python', name: 'Python', default: DEFAULT_PYTHON_CODE },
    { id: 'java', name: 'Java', default: DEFAULT_JAVA_CODE },
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return '';
    }
};

export default function PracticePage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get topic and problem from URL parameters
    const topicParam = searchParams.get('topic');
    const problemParam = searchParams.get('problem');

    // Find the topic from URL or default to first topic
    const initialTopic = topicParam
        ? mockTopics.find(t => t.id === topicParam) || mockTopics[0]
        : mockTopics[0];

    // Find the problem from URL or default to first problem of the topic
    const initialProblem = problemParam && initialTopic.problems.find(p => p.id === problemParam)
        ? initialTopic.problems.find(p => p.id === problemParam)
        : initialTopic.problems[0];

    const [selectedTopic, setSelectedTopic] = useState<Topic>(initialTopic);
    const [selectedProblem, setSelectedProblem] = useState<Problem>(initialProblem!);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(DEFAULT_JAVASCRIPT_CODE);
    const [showSolution, setShowSolution] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showProblemInFullscreen, setShowProblemInFullscreen] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    // Select appropriate code template when changing language
    useEffect(() => {
        const selectedLanguage = languages.find(lang => lang.id === language);
        if (selectedLanguage) {
            setCode(selectedLanguage.default);
        }
    }, [language]);

    // Update problem when topic changes
    useEffect(() => {
        if (selectedTopic && selectedTopic.problems.length > 0) {
            setSelectedProblem(selectedTopic.problems[0]);
        }
    }, [selectedTopic]);

    // Handle keyboard shortcuts for fullscreen toggle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Escape key to exit fullscreen
            if (e.key === 'Escape' && isFullScreen) {
                setIsFullScreen(false);
            }

            // F11 to enter fullscreen (prevent default browser behavior)
            if (e.key === 'F11') {
                e.preventDefault();
                setIsFullScreen(!isFullScreen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullScreen]);

    const handleTopicChange = (topicId: string) => {
        const topic = mockTopics.find(t => t.id === topicId);
        if (topic) {
            setSelectedTopic(topic);
            // Update URL when topic changes
            const newParams = new URLSearchParams(searchParams);
            newParams.set('topic', topicId);
            newParams.delete('problem'); // Reset problem when topic changes
            router.push(`/practice?${newParams.toString()}`);
        }
    };

    const handleProblemChange = (problemId: string) => {
        const problem = selectedTopic.problems.find(p => p.id === problemId);
        if (problem) {
            setSelectedProblem(problem);
            // Reset solution and hint visibility
            setShowSolution(false);
            setShowHint(false);

            // Update URL when problem changes
            const newParams = new URLSearchParams(searchParams);
            newParams.set('problem', problemId);
            router.push(`/practice?${newParams.toString()}`);
        }
    };

    const handleLanguageChange = (langId: string) => {
        setLanguage(langId);
    };

    const handleRunCode = () => {
        // In a real application, this would send the code to a backend for execution
        alert("In a real application, this would run your code against test cases");
    };

    const handleSubmit = () => {
        // In a real application, this would validate the solution
        alert("In a real application, this would validate your solution against all test cases");
    };

    // Add render function for editor to avoid code duplication
    const renderEditor = (height: string) => (
        <Editor
            height={height}
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                automaticLayout: true,
            }}
        />
    );

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-background border-b py-3 px-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/roadmap/topics" className="flex items-center">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to Topics
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold">{selectedProblem.title}</h1>
                    <Badge className={`${getDifficultyColor(selectedProblem.difficulty)} ml-2`}>
                        {selectedProblem.difficulty}
                    </Badge>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={selectedTopic.id} onValueChange={handleTopicChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockTopics.map(topic => (
                                <SelectItem key={topic.id} value={topic.id}>
                                    {topic.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Dockable Problem List Panel */}
                {isPanelOpen && (
                    <div className="w-[250px] border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="font-medium">Problems</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsPanelOpen(false)}
                                className="p-0 h-8 w-8"
                            >
                                <PanelLeftClose className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                                {selectedTopic.problems.map(problem => (
                                    <li
                                        key={problem.id}
                                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedProblem.id === problem.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                                        onClick={() => handleProblemChange(problem.id)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium">{problem.title}</h3>
                                            <Badge className={getDifficultyColor(problem.difficulty)}>
                                                {problem.difficulty}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{problem.topic}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Main Content Area with Problem Description and Code Editor */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="flex flex-1 overflow-hidden">
                        {/* Problem Description */}
                        <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                            <div className="border-b border-gray-200 dark:border-gray-800 p-3 flex items-center gap-2">
                                {!isPanelOpen && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsPanelOpen(true)}
                                        className="p-0 h-8 w-8 flex-shrink-0"
                                    >
                                        <PanelLeftOpen className="h-4 w-4" />
                                    </Button>
                                )}
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="w-full grid grid-cols-3">
                                        <TabsTrigger value="description">Problem</TabsTrigger>
                                        <TabsTrigger value="examples">Examples</TabsTrigger>
                                        <TabsTrigger value="solution">Solution</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <div className="overflow-y-auto p-4 flex-1">
                                {activeTab === 'description' && (
                                    <div className="space-y-4">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="whitespace-pre-line">{selectedProblem.description}</p>
                                        </div>

                                        {selectedProblem.constraints.length > 0 && (
                                            <div>
                                                <h3 className="text-base font-semibold mb-2">Constraints:</h3>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {selectedProblem.constraints.map((constraint, index) => (
                                                        <li key={index} className="text-sm">{constraint}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowHint(!showHint)}
                                            >
                                                <LightbulbIcon className="h-4 w-4 mr-1" />
                                                {showHint ? 'Hide Hint' : 'Show Hint'}
                                            </Button>
                                        </div>

                                        {showHint && selectedProblem.hint && (
                                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                                                    <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                                                    Hint:
                                                </h3>
                                                <p className="text-sm">{selectedProblem.hint}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'examples' && (
                                    <div className="space-y-6">
                                        {selectedProblem.examples.map((example, index) => (
                                            <div key={index} className="p-4 border rounded-md">
                                                <h3 className="text-sm font-semibold mb-3">Example {index + 1}:</h3>
                                                <div className="space-y-4">
                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Input:</p>
                                                        <pre className="text-sm font-mono whitespace-pre-wrap">{example.input}</pre>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Output:</p>
                                                        <pre className="text-sm font-mono whitespace-pre-wrap">{example.output}</pre>
                                                    </div>
                                                    {example.explanation && (
                                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Explanation:</p>
                                                            <p className="text-sm">{example.explanation}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'solution' && (
                                    <div className="space-y-6">
                                        {selectedProblem.solution ? (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-base font-semibold">Solution Approach</h3>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setShowSolution(!showSolution)}
                                                    >
                                                        {showSolution ? 'Hide Code' : 'Show Code'}
                                                    </Button>
                                                </div>
                                                <p className="text-sm">This is one possible solution to the problem. There might be other approaches as well.</p>

                                                {showSolution && (
                                                    <div className="border rounded-md overflow-hidden">
                                                        <Editor
                                                            height="300px"
                                                            language="javascript"
                                                            value={selectedProblem.solution}
                                                            options={{
                                                                readOnly: true,
                                                                minimap: { enabled: false },
                                                                scrollBeyondLastLine: false,
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center p-8">
                                                <p className="text-muted-foreground">Solution not available for this problem.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Code Editor Section */}
                        <div className="w-2/3 flex flex-col overflow-hidden">
                            {/* Editor Controls */}
                            <div className="border-b border-gray-200 dark:border-gray-800 p-3 flex justify-between items-center">
                                <Select value={language} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map(lang => (
                                            <SelectItem key={lang.id} value={lang.id}>
                                                {lang.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                    className="h-8 w-8 p-0"
                                >
                                    {isFullScreen ?
                                        <Minimize className="h-4 w-4" /> :
                                        <Maximize className="h-4 w-4" />
                                    }
                                </Button>
                            </div>

                            {/* Editor */}
                            <div className="flex-1">
                                {!isFullScreen && renderEditor("calc(100vh - 195px)")}
                            </div>

                            {/* Action Buttons */}
                            <div className="border-t border-gray-200 dark:border-gray-800 p-3 flex justify-end gap-3">
                                <Button variant="outline" onClick={handleRunCode}>
                                    <Play className="h-4 w-4 mr-2" />
                                    Run Code
                                </Button>
                                <Button onClick={handleSubmit}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Modal */}
            <FullScreenModal
                isOpen={isFullScreen}
                onClose={() => setIsFullScreen(false)}
                title={`${selectedProblem.title}`}
                language={language}
                onLanguageChange={handleLanguageChange}
                languages={languages}
            >
                <div className="h-full flex flex-col">
                    <div className="flex-grow flex">
                        <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">{selectedProblem.title}</h3>
                                <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                                    {selectedProblem.difficulty}
                                </Badge>
                            </div>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                    <TabsTrigger value="examples">Examples</TabsTrigger>
                                </TabsList>

                                <TabsContent value="description" className="space-y-4">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line">{selectedProblem.description}</p>
                                    </div>
                                    {selectedProblem.constraints.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-base font-semibold mb-2">Constraints:</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {selectedProblem.constraints.map((constraint, index) => (
                                                    <li key={index} className="text-sm">{constraint}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {showHint && selectedProblem.hint && (
                                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                                                <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                                                Hint:
                                            </h3>
                                            <p className="text-sm">{selectedProblem.hint}</p>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="examples">
                                    <div className="space-y-4">
                                        {selectedProblem.examples.map((example, index) => (
                                            <div key={index} className="p-4 border rounded-md">
                                                <h3 className="text-sm font-semibold mb-2">Example {index + 1}:</h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Input:</p>
                                                        <pre className="text-sm font-mono whitespace-pre-wrap">{example.input}</pre>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Output:</p>
                                                        <pre className="text-sm font-mono whitespace-pre-wrap">{example.output}</pre>
                                                    </div>
                                                </div>
                                                {example.explanation && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Explanation:</p>
                                                        <p className="text-sm">{example.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="w-2/3 border rounded-md overflow-hidden">
                            {renderEditor("calc(100vh - 120px)")}
                        </div>
                    </div>
                    <div className="p-4 flex justify-end items-center border-t">
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleRunCode}>
                                <Play className="h-4 w-4 mr-2" />
                                Run Code
                            </Button>
                            <Button onClick={handleSubmit}>
                                <Check className="h-4 w-4 mr-2" />
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </FullScreenModal>
        </div>
    );
}

// Fullscreen modal component
export function FullScreenModal({ isOpen, onClose, children, title, language, onLanguageChange, languages }: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
    title: string,
    language: string,
    onLanguageChange: (value: string) => void,
    languages: { id: string, name: string, default: string }[]
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-base font-medium">{title}</h2>
                <div className="flex items-center gap-3">
                    <Select value={language} onValueChange={onLanguageChange}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map(lang => (
                                <SelectItem key={lang.id} value={lang.id}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={onClose}>
                        <Minimize className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                {children}
            </div>
        </div>
    );
} 