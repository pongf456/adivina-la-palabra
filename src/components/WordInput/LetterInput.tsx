import clsx from "clsx"
import { forwardRef, useMemo } from "react"

interface Properties {
  letter: string
  change?(e: React.ChangeEvent<HTMLInputElement>): void
}
const LetterInput = forwardRef<HTMLInputElement, Properties>(function letterInput({ letter, change }, ref) {
  const isCompleted = useMemo(() => !letter.match(' '), [letter])
  return (
    <input maxLength={1} onChange={(e) => {
      if (change) change(e)
    }} disabled={isCompleted} type="text" className={
      clsx(
        "w-10 h-10 p-1 font-inter uppercase font-bold placeholder:text-secondary-100 text-secondary-100 outline-none border-2 bg-background-light rounded-sm text-center",
        isCompleted ? 'border-secondary-100 opacity-80' : 'border-accent-red'
      )
    } ref={ref} placeholder={letter} />
  )
})
export default LetterInput