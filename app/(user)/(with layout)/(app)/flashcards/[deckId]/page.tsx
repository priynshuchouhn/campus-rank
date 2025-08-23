'use client'
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, HelpCircle, Loader2, X, } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchFlashCardsByDeckId } from "@/lib/actions/flashcard";
import { Flashcard, FlashcardDeck } from "@prisma/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import FlashcardHint from "@/components/ui/flashcard-hint";




const FlashcardReview = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [flashcards, setFlashcards] = useState<(Flashcard & { deck: FlashcardDeck })[]>([])
    const [isLoading, setisLoading] = useState(false);
    const { deckId } = useParams();

    useEffect(() => {
        async function fetchCards() {
            if (deckId) {
                try {
                    setisLoading(true);
                    const data = await fetchFlashCardsByDeckId(deckId as string);
                    setFlashcards(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setisLoading(false);
                }
            }
        }
        fetchCards()

    }, [deckId])

    const currentCard = flashcards[currentIndex];
    const progress = ((completedCards) / flashcards.length) * 100;

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
            if (currentIndex < flashcards.length - 1) {
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }



    return (flashcards.length > 0 ? (<div className="min-h-screen flex flex-col items-center relative">
        <div className="w-full max-w-4xl space-y-8 relative z-10">
            {/* Clean Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Link href="/flashcards">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold text-primary dark:text-accent-foreground">
                        {flashcards[0].deck.name}
                    </h2>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-accent-foreground">
                        <span>Progress</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold dark:bg-background">
                            {completedCards} / {flashcards.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            {/* Clean Flashcard */}
            <div className="perspective-1000">
                <Card className="w-full h-80 bg-white shadow-xl rounded-3xl border-0 cursor-pointer transition-all duration-500 hover:shadow-2xl dark:bg-background"
                    onClick={!isFlipped ? handleFlip : undefined}>
                    <div className={`card-flip-container ${isFlipped ? 'flipped' : ''} w-full h-full`}>
                        {/* Front of card */}
                        <div className="card-side card-front flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl dark:bg-background">
                            <div className="space-y-6 w-full">
                                <div className="flex justify-center">
                                    <div className="text-2xl font-bold text-primary bg-primary/10 px-6 py-3 rounded-full dark:text-accent dark:bg-accent/20">
                                        {currentIndex + 1}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <p className="text-xl text-center leading-relaxed text-gray-700 font-medium max-w-lg dark:text-accent-foreground">
                                        {currentCard?.question}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="card-side card-back flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl dark:bg-background">
                            <div className="space-y-6 w-full flex justify-center">
                                <p className="text-lg leading-relaxed text-gray-700 max-w-lg dark:text-accent-foreground">
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
                    <>
                        <Button
                            variant="success"
                            onClick={handleFlip}
                            disabled={isAnimating}
                        >
                            Reveal Answer
                        </Button>
                        {flashcards[currentIndex].hint &&
                           <FlashcardHint hint={flashcards[currentIndex].hint} />
                        }
                    </>
                )}
            </div>
        </div>
    </div>) : <>
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center flex flex-col gap-3">
                <p className="text-lg font-semibold">No Flashcards found...</p>
                <Link href="/flashcards"><Button><ArrowLeft /> Go Back</Button></Link>
            </div>
        </div>
    </>
    );
};

export default FlashcardReview;