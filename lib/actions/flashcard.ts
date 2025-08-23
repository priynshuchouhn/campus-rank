'use server'
import { prisma } from "../prisma";

export async function fetchFlashCardDeck() {
    try {
        const decks = await prisma.flashcardDeck.findMany({
            include: {
                _count:{
                    select:{
                        flashcards: true,
                    }
                }
            }
        })
        return decks;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function fetchFlashCardsByDeckId(deckId:string) {
    try {
        const flashcard = await prisma.flashcard.findMany({
            where:{
                deckId
            },
            include:{
                deck:true
            }
        })
        return flashcard;
    } catch (error) {
        console.log(error);
        return [];
    }
}