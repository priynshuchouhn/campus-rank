'use server'
import { getCachedFlashcardDecks, getCachedFlashcardsByDeckId } from "../public-cache";

export async function fetchFlashCardDeck() {
    try {
        return getCachedFlashcardDecks();
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function fetchFlashCardsByDeckId(deckId:string) {
    try {
        return getCachedFlashcardsByDeckId(deckId);
    } catch (error) {
        console.log(error);
        return [];
    }
}
