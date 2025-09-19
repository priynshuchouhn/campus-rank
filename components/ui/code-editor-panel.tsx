"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
    Play,
    Upload,
    Settings,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Clock,
    Zap
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from './theme-toggle';
import { Example, Question, SampleCode } from '@prisma/client';

interface TestCase {
    input: string;
    expectedOutput: string;
}


interface TestResult {
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    runtime?: string;
    memory?: string;
}

interface CodeEditorPanelProps {
    question: Question & { sampleCodes: SampleCode[], testCases: TestCase[], constraints: string[], examples?: Example[] };
}

export function CodeEditorPanel({ question }: any) {
    const [selectedLanguage, setSelectedLanguage] = useState('java');
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [submissionResult, setSubmissionResult] = useState<{
        status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
        passedTests: number;
        totalTests: number;
        runtime?: string;
        memory?: string;
        details?: string;
    } | null>(null);
    const editorRef = useRef(null);

    const languages = [
        { value: 'javascript', language: 'JAVASCRIPT', label: 'JavaScript' },
        { value: 'python', language: 'PYTHON', label: 'Python' },
        { value: 'java', language: 'JAVA', label: 'Java' },
        { value: 'cpp', language: 'CPP', label: 'C++' }
    ];

    useEffect(() => {
        const sampleCode =
            question.sampleCodes.find(
                (c: any) => c.language.toLowerCase() === selectedLanguage.toLowerCase()
            )?.code || "";
        setCode(sampleCode);
    }, [selectedLanguage, question.sampleCodes]);

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        setTestResults([]);
        setSubmissionResult(null);
    };

    const simulateTestExecution = (testCase: TestCase): TestResult => {
        const passed = Math.random() > 0.2; // 80% pass rate for demo
        return {
            passed,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: passed ? testCase.expectedOutput : "Wrong output",
            runtime: Math.floor(Math.random() * 50 + 10) + 'ms',
            memory: (Math.random() * 10 + 40).toFixed(1) + 'MB'
        };
    };

    const handleRunCode = () => {
        setIsRunning(true);
        setSubmissionResult(null);

        setTimeout(() => {
            const results = question.testCases.map((testCase: any) =>
                simulateTestExecution(testCase)
            );
            setTestResults(results);
            setIsRunning(false);
        }, 1500);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTestResults([]);

        setTimeout(() => {
            const results = question.testCases.map((testCase: any) =>
                simulateTestExecution(testCase)
            );

            const passedTests = results.filter((r: any) => r.passed).length;
            const totalTests = results.length;

            let status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
            if (passedTests === totalTests) {
                status = 'Accepted';
            } else if (Math.random() > 0.8) {
                status = 'Time Limit Exceeded';
            } else if (Math.random() > 0.9) {
                status = 'Runtime Error';
            } else {
                status = 'Wrong Answer';
            }

            setSubmissionResult({
                status,
                passedTests,
                totalTests,
                runtime: Math.floor(Math.random() * 100 + 50) + 'ms',
                memory: (Math.random() * 20 + 40).toFixed(1) + 'MB'
            });

            setTestResults(results);
            setIsSubmitting(false);
        }, 2000);
    };

    const handleReset = () => {
        setCode(question.sampleCodes.find((c: any) => c.language.toLowerCase() == selectedLanguage.toLowerCase())?.code || '');
        setTestResults([]);
        setSubmissionResult(null);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Accepted':
                return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'Wrong Answer':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'Time Limit Exceeded':
                return <Clock className="w-4 h-4 text-orange-600" />;
            case 'Runtime Error':
                return <Zap className="w-4 h-4 text-purple-600" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Accepted':
                return 'text-green-600 dark:text-green-400';
            case 'Wrong Answer':
                return 'text-red-600 dark:text-red-400';
            case 'Time Limit Exceeded':
                return 'text-orange-600 dark:text-orange-400';
            case 'Runtime Error':
                return 'text-purple-600 dark:text-purple-400';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="h-full flex flex-col bg-background">
            {/* Editor Header */}
            <div className="border-b px-4 py-3 flex items-center justify-between bg-background">
                <div className="flex items-center space-x-3">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="ghost" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>

                    <ThemeToggle />
                    <Button variant="ghost">
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={handleRunCode}
                        disabled={isRunning || isSubmitting}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        {isRunning ? 'Running...' : 'Run'}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isRunning || isSubmitting}
                        variant={'success'}          >
                        <Upload className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </div>
            <ResizablePanelGroup direction="vertical" className="w-full">
                <ResizablePanel defaultSize={45} minSize={30}>
                    <Editor
                        height="100%"
                        language={selectedLanguage === "java" ? "java" : selectedLanguage}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="vs-dark"
                        options={{
                            // Layout & UX
                            automaticLayout: true,
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                            lineNumbers: "on",
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            smoothScrolling: true,

                            // Tabs & Indentation
                            tabSize: 2,
                            insertSpaces: true,
                            detectIndentation: true,
                            wordWrap: "on",
                            wrappingIndent: "same",

                            // Cursor & Selection
                            cursorBlinking: "smooth",
                            cursorStyle: "line",
                            renderLineHighlight: "line",
                            selectionHighlight: true,

                            // Code Assistance
                            folding: true,
                            foldingStrategy: "auto",
                            suggestOnTriggerCharacters: true,
                            quickSuggestions: { other: true, comments: false, strings: true },
                            quickSuggestionsDelay: 100,
                            acceptSuggestionOnEnter: "on",
                            parameterHints: { enabled: true },

                            // Decorations
                            renderWhitespace: "none",
                            renderControlCharacters: false,
                            colorDecorators: true,

                            // Scrollbars
                            scrollbar: {
                                vertical: "auto",
                                horizontal: "auto",
                                useShadows: false,
                                verticalScrollbarSize: 8,
                                horizontalScrollbarSize: 8,
                            },

                            padding: { top: 12, bottom: 12 },

                            // Misc
                            contextmenu: true,
                            links: true,
                            glyphMargin: false, // no extra margin unless debugging
                            mouseWheelZoom: true, // Ctrl + scroll zoom
                        }}
                        onMount={(editor) => {
                            editorRef.current = editor as any;
                        }}
                    />

                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={55} minSize={30}>
                    <Tabs defaultValue="testcase" className="w-full h-full flex flex-col">
                        {/* Tab headers */}
                        <div className="px-4 py-2 border-b">
                            <TabsList className="grid w-full grid-cols-2 bg-transparent h-10">
                                <TabsTrigger value="testcase" >
                                    Testcase
                                </TabsTrigger>
                                <TabsTrigger value="result">
                                    Result
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        {/* Testcase tab */}
                        <TabsContent value="testcase" className="flex-1 overflow-scroll">
                            <ScrollArea className="h-full pb-8">
                                <div className="p-4 space-y-3">
                                    {testResults.length > 0 ? (
                                        testResults.map((test, index) => (
                                            <Card key={index} className="rounded-lg border">
                                                <CardContent className="p-3 space-y-2">
                                                    {/* Header with Pass/Fail */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(test.passed ? "Accepted" : "Wrong Answer")}
                                                            <span
                                                                className={`text-sm font-semibold ${getStatusColor(test.passed ? "Accepted" : "Wrong Answer")
                                                                    }`}
                                                            >
                                                                {test.passed ? "Passed" : "Failed"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{test.runtime}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Zap className="w-3 h-3" />
                                                                <span>{test.memory}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Input */}
                                                    <div>
                                                        <p className="text-sm font-semibold">Input:</p>
                                                        <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap dark:bg-background">
                                                            {test.input}
                                                        </pre>
                                                    </div>

                                                    {/* Expected */}
                                                    <div>
                                                        <p className="text-sm font-semibold mt-1">Expected Output:</p>
                                                        <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap dark:bg-background">
                                                            {test.expectedOutput}
                                                        </pre>
                                                    </div>

                                                    {/* Your Output */}
                                                    <div>
                                                        <p className="text-sm font-semibold mt-1">Your Output:</p>
                                                        <pre
                                                            className={`p-2 rounded text-sm whitespace-pre-wrap ${test.passed
                                                                ? "bg-green-500/20 text-green-800 dark:text-green-400"
                                                                : "bg-red-500/20 text-red-600 dark:text-red-400"
                                                                }`}
                                                        >
                                                            {test.actualOutput}
                                                        </pre>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : question.examples && question.examples.length > 0 ? (
                                        question.examples.map((example: any, idx: number) => (
                                            <Card key={idx} className="rounded-lg border">
                                                <CardContent className="p-3">
                                                    <p className="text-sm font-semibold">Input:</p>
                                                    <pre className="bg-muted p-2 rounded text-sm dark:bg-background">
                                                        {example.input}
                                                    </pre>
                                                    <p className="text-sm font-semibold mt-2">Output:</p>
                                                    <pre className="bg-muted p-2 rounded text-sm dark:bg-background">
                                                        {example.output}
                                                    </pre>
                                                    {example.explanation && (
                                                        <>
                                                            <p className="text-sm font-semibold mt-2">Explanation:</p>
                                                            <pre className="bg-muted p-2 rounded text-sm dark:bg-background">
                                                                {example.explanation}
                                                            </pre>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <Card className="rounded-lg border">
                                            <CardContent className="p-3 text-sm text-muted-foreground">
                                                No examples available.
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>


                        {/* Result tab */}
                        {/* <TabsContent value="result" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {submissionResult ? (
                    <Card className="rounded-lg border">
                      <CardContent className="p-3">
                        <p className="text-sm font-semibold">Verdict:</p>
                        <pre className="bg-muted p-2 rounded text-sm">{submissionResult.status}</pre>
                        <p className="text-sm font-semibold mt-2">Details:</p>
                        <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap">
                          {submissionResult.details}
                        </pre>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="rounded-lg border">
                      <CardContent className="p-3 text-sm text-muted-foreground">
                        Run your code to see detailed results here.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent> */}
                        <TabsContent value="result" className="flex-1 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="p-4">
                                    {submissionResult ? (
                                        <Card
                                            className={`rounded-lg border ${submissionResult.status === "Accepted"
                                                ? "border-green-600"
                                                : submissionResult.status === "Wrong Answer"
                                                    ? "border-red-600"
                                                    : submissionResult.status === "Time Limit Exceeded"
                                                        ? "border-orange-600"
                                                        : "border-purple-600"
                                                }`}
                                        >
                                            <CardContent className="p-3 space-y-4">
                                                {/* Verdict Header */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(submissionResult.status)}
                                                        <span
                                                            className={`font-semibold text-sm ${getStatusColor(
                                                                submissionResult.status
                                                            )}`}
                                                        >
                                                            {submissionResult.status}
                                                        </span>
                                                    </div>
                                                    <Badge
                                                        className={`${submissionResult.status === "Accepted"
                                                            ? "bg-green-600"
                                                            : "bg-red-600"
                                                            } text-white`}
                                                    >
                                                        {submissionResult.passedTests}/{submissionResult.totalTests} Passed
                                                    </Badge>
                                                </div>

                                                {/* Runtime & Memory */}
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{submissionResult.runtime || "--"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <Zap className="w-4 h-4" />
                                                        <span>{submissionResult.memory || "--"}</span>
                                                    </div>
                                                </div>

                                                {/* Details (if any) */}
                                                {submissionResult.details && (
                                                    <div>
                                                        <p className="text-sm font-semibold">Details:</p>
                                                        <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap dark:bg-background">
                                                            {submissionResult.details}
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Accordion for Testcases */}
                                                <Accordion type="single" collapsible>
                                                    <AccordionItem value="testcases">
                                                        <AccordionTrigger className="text-sm font-semibold">
                                                            Show Testcases
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="mt-3 space-y-3">
                                                                {testResults.map((test, index) => (
                                                                    <Card key={index} className="rounded border">
                                                                        <CardContent className="p-3 space-y-2">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-2">
                                                                                    {getStatusIcon(test.passed ? "Accepted" : "Wrong Answer")}
                                                                                    <span
                                                                                        className={`text-xs font-medium ${getStatusColor(
                                                                                            test.passed ? "Accepted" : "Wrong Answer"
                                                                                        )}`}
                                                                                    >
                                                                                        {test.passed ? "Passed" : "Failed"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <Clock className="w-3 h-3" />
                                                                                        <span>{test.runtime}</span>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-1">
                                                                                        <Zap className="w-3 h-3" />
                                                                                        <span>{test.memory}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div>
                                                                                <p className="text-xs font-semibold">Input:</p>
                                                                                <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap dark:bg-background">
                                                                                    {test.input}
                                                                                </pre>
                                                                            </div>

                                                                            <div>
                                                                                <p className="text-xs font-semibold">Expected Output:</p>
                                                                                <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap dark:bg-background">
                                                                                    {test.expectedOutput}
                                                                                </pre>
                                                                            </div>

                                                                            <div>
                                                                                <p className="text-xs font-semibold">Your Output:</p>
                                                                                <pre
                                                                                    className={`p-2 rounded text-xs whitespace-pre-wrap ${test.passed
                                                                                        ? "bg-green-500/20 text-green-800 dark:text-green-400"
                                                                                        : "bg-red-500/20 text-red-600 dark:text-red-400"
                                                                                        }`}
                                                                                >
                                                                                    {test.actualOutput}
                                                                                </pre>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <Card className="rounded-lg border">
                                            <CardContent className="p-3 text-sm text-muted-foreground">
                                                Run or submit your code to see results here.
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}