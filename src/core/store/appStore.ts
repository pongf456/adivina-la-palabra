import { create } from "zustand";
import { type GameController } from "../types/interfaces";
import { WordManager } from "../wordManager";
import { Word } from "../word";

export const useAppStore = create<GameController>((set, get) => ({
    currentWord: undefined,
    currentClue: undefined,
    maxRecord: 0,
    currentRecord: 0,
    gameStatus: 'idle',
    complete(other) {
        if (this.currentWord) {
            if (this.currentWord.compare(other)) {
                set((current) => ({
                    currentRecord: current.currentRecord++,
                    maxRecord: current.currentRecord > current.maxRecord ? current.currentRecord : current.maxRecord,
                    currentWord: new Word(WordManager.getRandomWord()),
                    currentClue: undefined
                }))

            }
        }
    },
    restart() {
        set({
            currentWord: undefined,
            currentClue: undefined,
            gameStatus: 'idle',
            currentRecord: 0
        })
    },
    start() {
        set({
            currentWord: new Word(WordManager.getRandomWord()),
            gameStatus: 'running'
        })
    },
}))