import { useCallback, useMemo, useRef, } from "react"
import { HideLevels, Word, type Letter } from "../../core"
import LetterInput from "./LetterInput"
import { AnimatePresence, motion } from 'motion/react'
import SendButton from "./SendButton"
interface Properties {
  word: Word,
  onSuccess?: (letters: string[]) => void
}
export default function WordInput({ word, onSuccess }: Properties) {
  const wordHidden = useMemo(() => word.obtainWordHidden(HideLevels.high), [word])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const next = (index: number) => {
    for (let i = index + 1; i < inputRefs.current.length; i++) {
      const target = inputRefs.current[i]
      if (target && !target.disabled) {
        target.focus()
        break;
      }
    }
  }
  const back = (index: number) => {
    if (index === 0) return
    for (let i = index - 1; i >= 0; i--) {
      const target = inputRefs.current[i]
      if (target && !target.disabled) {
        target.focus()
        break;
      }
    }
  }
  const solve = useCallback(() => {
    const letters = inputRefs.current.map((input) => {
      if (input) {
        if (input.disabled) return input.placeholder
        else return input.value
      }
      else return ''
    })
    if (word.compare(letters) && onSuccess) {
      onSuccess(letters)
      return true
    }
    else return false
  }, [word])
  const renderInput = useCallback((letter: Letter, index: number) => <LetterInput index={index} ref={(self) => {
    inputRefs.current[index] = self
  }} key={word.word + index} onChange={(e) => {
    if (e.target.value === '') back(index)
    else next(index)
  }} onKeyDown={(e) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      back(index)
    }
    else if (e.currentTarget.value !== '' && e.key !== 'Backspace') {
      next(index)
    }
  }} id={word.word + index} letter={letter} />, [])
  return (
    <AnimatePresence mode='wait'>
      <motion.div key={word.word} className="flex flex-wrap p-2 gap-2">
        {wordHidden.map((letter, index) => renderInput(letter, index))}
        <SendButton key={`submit-${word.word}`} index={wordHidden.length} submit={solve} />
      </motion.div>
    </AnimatePresence>
  )
}
