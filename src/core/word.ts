import type { Letter } from "./types"
import { HideLevels } from "./types/enums"
import type { WordBase } from "./types/interfaces"

export class Word {
    word: string
    expirationTime: number
    clues: string[]
    get splitted() {
        return this.word.split('')
    }
    static normalizeAndRemoveAccents(text: string): string {
        const normalizedText = text.normalize("NFD");
        const textWithoutAccents = normalizedText.replace(/[\u0300-\u036f]/g, "");
        const finalCleanText = textWithoutAccents
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "");
        return finalCleanText;
    }
    constructor(data: WordBase) {
        this.word = Word.normalizeAndRemoveAccents(data.word)
        this.expirationTime = data.expirationTime
        this.clues = data.clues
    }
    compare(other: string | string[]): boolean {
        if (Array.isArray(other)) return Word.normalizeAndRemoveAccents(other.join('')) === this.word
        return Word.normalizeAndRemoveAccents(other) === this.word
    }
    private hide(length: number):Letter[] {
        let wordToReturn:Letter[] = this.splitted
        for (let i = 1; i <= length; i++) {
            wordToReturn[Math.round(Math.random() * wordToReturn.length - 1)] = undefined
        }
        return wordToReturn
    }
    obtainWordHidden(level: HideLevels): Letter[] {
        switch (level) {
            case HideLevels.low:
                return this.hide(Math.round((10 / 100) * this.word.length))
            case HideLevels.mid:
                return this.hide(Math.round((25 / 100) * this.word.length))
            case HideLevels.high:
                return this.hide(Math.round((50 / 100) * this.word.length))

        }
    }
    obtainClue(): string {
        return this.clues[Math.round(Math.random() * this.clues.length - 1)]
    }
    isIndex(letter: string, index: number): boolean {
        const letterIn = this.word[index]
        if (letterIn) {
            return letterIn === Word.normalizeAndRemoveAccents(letter)
        }
        else return false
    }
}