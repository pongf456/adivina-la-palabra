import { useCallback, useEffect, useMemo, useRef, } from "react"
import { HideLevels, Word } from "../../core"
import LetterInput from "./LetterInput"
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@iconify/react'
interface Properties {
  word: Word,
  onSuccess?: () => void
}
export default function WordInput({ word, onSuccess }: Properties) {
  const clue = useMemo(() => word.obtainWordHidden(HideLevels.high).split(''), [word])
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
      onSuccess()
    }
  }, [inputRefs, word])
  useEffect(() => {
    next(-1)
    inputRefs.current.map((e) => {
      if (e) e.value = ''
    })
  }, [clue])

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={word.word} className="flex flex-wrap p-2 gap-2">
        {clue.map((letter, index) => <LetterInput index={index} ref={(self) => {
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
        }} id={word.word + index} letter={letter} />)}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ delay: 0.2 * clue.length }}
          key={word.word + 'button'} onClick={solve} className="p-2 bg-accent-red text-2xl text-background-light cursor-pointer">
          <Icon icon="mdi:send-variant" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
