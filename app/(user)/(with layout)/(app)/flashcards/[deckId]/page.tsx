'use client'
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {  X, } from "lucide-react";

interface Flashcard {
    id: number;
    question: string;
    answer: string;
    subject: string;
}

interface FlashcardReviewProps {
    subject?: string;
}

const mockFlashcards: Flashcard[] = [
    {
        id: 1,
        question: "What is the difference between a process and a thread?",
        answer: "A process is an independent program execution with its own memory space, while a thread is a lightweight execution unit within a process that shares memory with other threads.",
        subject: "Operating Systems"
    },
    {
        id: 2,
        question: "Explain the concept of virtual memory.",
        answer: "Virtual memory is a memory management technique that provides an abstraction of storage resources. It allows a program to use more memory than physically available by swapping data between RAM and disk storage.",
        subject: "Operating Systems"
    },
    {
        id: 3,
        question: "What is a deadlock in operating systems?",
        answer: "A deadlock is a situation where two or more processes are unable to proceed because each is waiting for the other to release a resource. It occurs when four conditions are met: mutual exclusion, hold and wait, no preemption, and circular wait.",
        subject: "Operating Systems"
    },
    {
        id: 4,
        question: "Describe the purpose of a page table.",
        answer: "A page table is a data structure used by virtual memory systems to map virtual addresses to physical addresses. It enables the operating system to translate virtual page numbers to physical frame numbers.",
        subject: "Operating Systems"
    },
    {
        id: 5,
        question: "What is context switching?",
        answer: "Context switching is the process of storing and restoring the state of a process or thread so that execution can be resumed from the same point later. It allows multiple processes to share a single CPU.",
        subject: "Operating Systems"
    }
];

const FlashcardReview = ({ subject = "Operating Systems" }: FlashcardReviewProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentCard = mockFlashcards[currentIndex];
    const progress = ((completedCards) / mockFlashcards.length) * 100;

    const handleFlip = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsFlipped(!isFlipped);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleCorrect = () => {
        if (isAnimating) return;
        nextCard();
    };

    const handleIncorrect = () => {
        if (isAnimating) return;
        nextCard();
    };

    const nextCard = () => {
        setIsAnimating(true);
        setCompletedCards(prev => prev + 1);

        setTimeout(() => {
            if (currentIndex < mockFlashcards.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setIsFlipped(false);
            } else {
                setCurrentIndex(0);
                setCompletedCards(0);
                setIsFlipped(false);
            }
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="min-h-screen flex flex-col items-center relative">
            <div className="w-full max-w-4xl space-y-8 relative z-10">
                {/* Clean Header */}
                <div className="text-center space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            </div>
                            {subject}
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                <span>Progress</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold">
                                    {completedCards} / {mockFlashcards.length}
                                </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    </div>
                </div>

                {/* Clean Flashcard */}
                <div className="perspective-1000">
                    <Card className="w-full h-80 bg-white shadow-xl rounded-3xl border-0 cursor-pointer transition-all duration-500 hover:shadow-2xl"
                        onClick={!isFlipped ? handleFlip : undefined}>
                        <div className={`card-flip-container ${isFlipped ? 'flipped' : ''} w-full h-full`}>
                            {/* Front of card */}
                            <div className="card-side card-front flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl">
                                <div className="space-y-6 w-full">
                                    <div className="flex justify-center">
                                        <div className="text-2xl font-bold text-[#4f80ff] bg-[#4f80ff]/10 px-6 py-3 rounded-full">
                                            {currentIndex + 1}
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xl text-center leading-relaxed text-gray-700 font-medium max-w-lg">
                                            {currentCard?.question}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Back of card */}
                            <div className="card-side card-back flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl">
                                <div className="space-y-6 w-full flex justify-center">
                                    <p className="text-lg leading-relaxed text-gray-700 max-w-lg">
                                        {currentCard?.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex justify-center gap-6">
                    {isFlipped ? (
                        <div className="flex gap-4">
                            <Button
                                variant="destructive"
                                size="lg"
                                onClick={handleIncorrect}
                                disabled={isAnimating}
                                className="flex items-center gap-2 px-8 py-3 rounded-2xl"
                            >
                                <X className="w-5 h-5" />
                                Review Again
                            </Button>
                            <Button
                                variant="success"
                                size="lg"
                                onClick={handleCorrect}
                                disabled={isAnimating}
                                className="px-8 py-3 rounded-2xl"
                            >
                                Got it!
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="success"
                            size="lg"
                            onClick={handleFlip}
                            disabled={isAnimating}
                            className="px-12 py-4 rounded-2xl text-lg font-semibold"
                        >
                            Reveal Answer
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlashcardReview;