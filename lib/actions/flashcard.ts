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