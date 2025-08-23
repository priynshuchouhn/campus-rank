import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFlashCardDeck } from "@/lib/actions/flashcard";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const icons = {
    "Operating System": "💻",
    "Computer Networks": "🌐",
    "DBMS": "🗄️",
    "Object Oriented Programming": "📈"

}

const getIcon = (name: string) => {
    return icons[name as keyof typeof icons]
}




const FlashcardDecks = async () => {
    const decks = await fetchFlashCardDeck();
    return (
        <div className="min-h-screen bg-gradient-background -my-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-primary/10 to-secondary/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Flashcards
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Choose a topic to start your learning journey. Master concepts through spaced repetition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {decks.map((deck) => (
                        <Link key={deck.id} href={`/flashcards/${deck.id}`} className="h-full">
                            <Card key={deck.id}  className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-0 rounded-3xl overflow-hidden group hover:scale-105">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl">{getIcon(deck.name)}</div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-accent-foreground">
                                                    {deck.name}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors dark:group-hover:text-accent" />
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed dark:text-gray-300">
                                        {deck.description}
                                    </CardDescription>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{deck._count.flashcards} cards</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{"20 min"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlashcardDecks;