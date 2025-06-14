// Word = Palabra

import { HideLevels } from "./enums"
import type { WordBase } from "./interfaces"

// Clase palabra
export class Word {
    // La palabra que se va a utilizar como juego
    word: string
    clues: string[]
    // La palabra dividida por letras
    get splitted() {
        return this.word.split('')
    }
    static normalizeAndRemoveAccents(text: string) {
        const normalizedText = text.normalize("NFD");
        const textWithoutAccents = normalizedText.replace(/[\u0300-\u036f]/g, "");
        const finalCleanText = textWithoutAccents
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "");
        return finalCleanText;
    }
    // Crear la palabra
    constructor(data: WordBase) {
        this.word = Word.normalizeAndRemoveAccents(data.word)
        this.clues = data.clues
    }
    // Función para comparar si la palabra del usuario coincide con la que tenemos
    compare(other: string | string[]): boolean {
        if (Array.isArray(other)) return Word.normalizeAndRemoveAccents(other.join('')) === this.word
        return Word.normalizeAndRemoveAccents(other) === this.word
    }
    // Función para generar una pista. (Cambia aleatoriamente letras de la palabra por espacios)
    private hide(length: number) {
        let wordToReturn = this.splitted
        for (let i = 1; i <= length; i++) {
            wordToReturn[Math.round(Math.random() * wordToReturn.length - 1)] = ' '
        }
        return wordToReturn.join('')
    }
    // Función para obtener pista en base a el tipo de pista; 10%, 25% y 50% de pista
    obtainWordHidden(level: HideLevels) {
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
    isIndex(letter: string, index: number) {
        const letterIn = this.word[index]
        if (letterIn) {
            return letterIn === Word.normalizeAndRemoveAccents(letter)
        }
        else return false
    }
}