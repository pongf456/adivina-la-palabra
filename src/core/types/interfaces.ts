import type { Word } from "../word"

export interface WordBase {
    word: string
    expirationTime: number
    clues: string[]
}
export interface AppStore {
    currentWord: Word | undefined
    currentClue: string | undefined
}