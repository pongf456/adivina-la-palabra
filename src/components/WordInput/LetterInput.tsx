import clsx from "clsx"
import React, { forwardRef, useMemo, useState } from "react"
import { useAppStore } from "../../core"
import { motion, type MotionProps } from 'motion/react'
type MotionInputProps = React.ComponentPropsWithoutRef<'input'> & MotionProps;
interface Properties extends MotionInputProps {
  letter: string,
  index: number
}
const LetterInput = forwardRef<HTMLInputElement, Properties>(function letterInput({ letter, index, onChange, ...props }, ref) {
  const currentWord = useAppStore((s) => s.currentWord)
  const isCompleted = useMemo(() => !letter.match(' '), [letter])
  const [value, setValue] = useState(letter)
  const valid = useMemo(() => currentWord?.isIndex(value, index), [value, index])
  return (
    <motion.input
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0
      }}
      transition={{delay: 0.2 * index}}
      onChange={(e) => {
        setValue(e.target.value)
        if (onChange) onChange(e)
      }} maxLength={1} {...props} disabled={isCompleted} type="text" className={
        clsx(
          "w-10 h-10 p-1 font-inter uppercase font-bold placeholder:text-secondary-100 text-secondary-100 outline-none border-2 bg-background-light rounded-sm text-center",
          isCompleted ? 'border-secondary-100 opacity-80' : valid ? 'border-accent-green' : 'border-accent-red'
        )
      } ref={ref} placeholder={letter} />
  )
})
export default LetterInput