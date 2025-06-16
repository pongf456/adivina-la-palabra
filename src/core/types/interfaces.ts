import type { Word } from "../word"

export interface WordBase {
    word:string
    clues:string[]
}
export interface AppStore {
    currentWord:Word | undefined
    currentClue:string | undefined
}