import data from './assets/words.json'
export class WordManager {
    static getRandomWord() {
      const indiceAleatorio = Math.floor(Math.random() * data.length);
      return data[indiceAleatorio];
    }
}