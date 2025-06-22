import type { Word } from "../word"
import type { Status } from "./types"

export interface WordBase {
    word: string
    expirationTime: number
    clues: string[]
}
export interface GameController {
    currentWord: Word | undefined
    currentClue: string | undefined
    gameStatus: Status
    record: number
    currentRecord: number
    complete(...params: Parameters<typeof Word.prototype.compare>): void
    start(): void
    restart(): void
}