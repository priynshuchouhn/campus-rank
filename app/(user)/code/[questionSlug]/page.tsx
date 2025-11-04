'use client';

import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ProblemPanel } from '@/components/ui/problem-panel';
import { CodeEditorPanel } from '@/components/ui/code-editor-panel';
import { useParams, useRouter } from 'next/navigation';
import { sampleQuestions } from '@/lib/data';
import { Example, ProgrammingLanguage } from '@prisma/client';

export default function CodeQuestionsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const problems = sampleQuestions
    const pathname = useParams();
    const [selectedProblem, setSelectedProblem] = useState(
        problems.find(p => p.slug === pathname.questionSlug) || problems[0]
    );
    return (
        <div className={`max-h-screen flex flex-col ${darkMode ? 'dark' : ''} overflow-hidden`} >
            <div className="flex-1 bg-background">
                <ResizablePanelGroup direction="horizontal" className="lg:h-full">
                    <ResizablePanel defaultSize={40} minSize={30}>
                        <ProblemPanel
                            selectedProblem={selectedProblem}
                            problems={sampleQuestions}
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={60} minSize={30}>
                        <CodeEditorPanel question={{
                            id: String(selectedProblem.id),
                            title: selectedProblem.title,
                            slug: selectedProblem.slug,
                            description: selectedProblem.description,
                            questionType: (selectedProblem as any).questionType ?? "coding",
                            difficulty: (selectedProblem as any).difficulty ?? "Easy",
                            predefinedTopicId: (selectedProblem as any).predefinedTopicId ?? null,
                            timeComplexity: selectedProblem.timeComplexity ?? null,
                            spaceComplexity: selectedProblem.spaceComplexity ?? null,
                            tags: selectedProblem.tags ?? [],
                            constraints: selectedProblem.constraints ?? [] as string[],
                            examples: (selectedProblem.examples || []).map((ex, idx) => ({
                                input: ex.input,
                                output: ex.output,
                                id: (ex as any).id ?? `example-${idx}`,
                                description: (ex as any).description ?? null,
                                questionId: (ex as any).questionId ?? String(selectedProblem.id),
                            })),
                            hints: selectedProblem.hints ?? [],
                            languageSupport: (selectedProblem as any).languageSupport ?? [],
                            createdAt: (selectedProblem as any).createdAt ?? new Date(),
                            updatedAt: (selectedProblem as any).updatedAt ?? new Date(),
                            sampleCodes: (selectedProblem.sampleCodes ?? []).map(code => ({
                                ...code,
                                language: code.language as ProgrammingLanguage,
                            })),
                            testCases: selectedProblem.testCases ?? [],
                            languageWrapper: selectedProblem.languageWrappers ?? []
                        }} />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}