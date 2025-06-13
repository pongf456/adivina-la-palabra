// Clue = Pista
// Word = Palabra

// Tipos de pista, baja, meda y alta
export enum ClueLevels {
    low,
    mid,
    high
}
// Clase palabra
export class Word {
    // La palabra que se va a utilizar como juego
    word:string
    // La palabra dividida por letras
    get splitted() {
        return this.word.split('')
    }
    // Crear la palabra
    constructor(word:string) {
        this.word = word.toUpperCase()
    }
    // Función para comparar si la palabra del usuario coincide con la que tenemos
    compare(other:string  | string[]):boolean {
        if(Array.isArray(other)) return other.join('').toUpperCase() === this.word
        return other.toUpperCase() === this.word
    }
    // Función para generar una pista. (Cambia aleatoriamente letras de la palabra por espacios)
    private clue(length:number) {
        let clueToReturn = this.splitted
        for (let i = 1; i <= length; i++) {
            clueToReturn[Math.round(Math.random() * clueToReturn.length -1)] = ' '
        }
        return clueToReturn.join('')
    }
    // Función para obtener pista en base a el tipo de pista; 10%, 25% y 50% de pista
    obtainClue(level:ClueLevels) {
        switch (level) {
            case ClueLevels.low:
                return this.clue(Math.round((10 / 100) * this.word.length))
            case ClueLevels.mid:
                return this.clue(Math.round((25 / 100) * this.word.length))
            case ClueLevels.high:
                return this.clue(Math.round((50 / 100) * this.word.length))  

        }
    }
}

