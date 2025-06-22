import { create } from "zustand";
import { type GameController } from "../types/interfaces";
import { WordManager } from "../wordManager";
import { Word } from "../word";

export const useAppStore = create<GameController>((set, get) => ({
    currentWord: undefined,
    currentClue: undefined,
    record: 0,
    currentRecord: 0,
    gameStatus: 'idle',
    complete(other) {
        const currentWord = get().currentWord
        if (currentWord) {
            if (currentWord.compare(other)) {
                set((current) => ({
                    currentRecord: current.currentRecord + 1,
                    currentWord: new Word(WordManager.getRandomWord()),
                    currentClue: undefined
                }))

            }
        }
    },
    restart() {
        set((store) => ({
            currentWord: undefined,
            currentClue: undefined,
            gameStatus: 'idle',
            currentRecord: 0,
            record: store.currentRecord,
        }))
    },
    start() {
        set({
            currentWord: new Word(WordManager.getRandomWord()),
            gameStatus: 'running'
        })
    },
}))