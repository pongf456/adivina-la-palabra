import data from './assets.json'
export class WordManager {
    static getRandomWord() {
      const indiceAleatorio = Math.floor(Math.random() * data.length);
      return data[indiceAleatorio];
    }
}