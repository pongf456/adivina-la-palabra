import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ClueLevels, Word } from "../../core"
import { Icon } from '@iconify/react'
import LetterInput from "./LetterInput"
const palabrasAleatorias = [
  "sol", "luna", "estrella", "nube", "lluvia",
  "viento", "flor", "arbol", "rio", "mar",
  "montaña", "sendero", "valle", "desierto", "oceano",
  "libro", "lapiz", "papel", "tinta", "escuela",
  "hogar", "casa", "ciudad", "pueblo", "calle",
  "perro", "gato", "pajaro", "pez", "leon",
  "tigre", "elefante", "jirafa", "mono", "oso",
  "comida", "agua", "pan", "fruta", "verdura",
  "azul", "rojo", "verde", "amarillo", "blanco",
  "negro", "gris", "rosa", "morado", "naranja",
  "musica", "arte", "danza", "canto", "pintura",
  "tiempo", "reloj", "minuto", "hora", "dia",
  "noche", "mañana", "tarde", "mediodia", "medianoche",
  "felicidad", "tristeza", "alegria", "miedo", "amor",
  "paz", "esperanza", "sueño", "despertar", "dormir"
];

function obtenerPalabraAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * palabrasAleatorias.length);
  return palabrasAleatorias[indiceAleatorio];
}
export default function WordInput() {
  const [word,setWord] = useState(new Word(obtenerPalabraAleatoria()))
  const clue = useMemo(() => word.obtainClue(ClueLevels.high).split(''), [word])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      console.log(inputRefs.current[0])
      inputRefs.current[0].focus()
    }
  }, [clue])
  const submit = () => {
    const userWord = inputRefs.current.map((v) => {
      if (v?.disabled) return v.placeholder ?? ''
      return v?.value ?? ''
    })
    console.log(word.word, userWord)
    if (word.compare(userWord)) {
      alert('¡Correcto! Sigue con otra palabra.')
      setWord(new Word(obtenerPalabraAleatoria()))
    }
    else {
      alert('¡Incorrecto! Intenta de nuevo.')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap p-2 gap-2">
        {clue.map((letter, index) => <LetterInput ref={(self) => {
          inputRefs.current[index] = self
        }} key={word.word + index} letter={letter} />)}
      </div>
      <button onClick={submit} className="p-1 text-xl bg-accent-red flex gap-1 items-center flex-row self-center rounded-md font-inter font-medium text-background-light">
        <span>Resolver</span>
        <Icon icon="mdi:head-check-outline" className="text-background-light" />
      </button>
    </div>
  )
}
