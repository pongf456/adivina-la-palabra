import { useEffect } from "react"
import { useAppStore } from "../core"
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'motion/react'
export default function Clue() {
  const clue = useAppStore((s) => s.currentClue)
  useEffect(() => {
    if (clue) {
      const timeout = setTimeout(() => {
        useAppStore.setState({ currentClue: undefined })
      }, 5000);
      return () => clearTimeout(timeout)
    }
  }, [clue])
  return (
    <AnimatePresence>
      {clue && <motion.div
        initial={{ scale: .5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute z-10 rounded-sm bottom-8 left-8 bg-primary-100 border-2 border-secondary-100 p-1 max-w-60 sm:max-w-80 flex items-center gap-2 text-secondary-100">
        <Icon icon="mdi:lightbulb-variant-outline"
         className="absolute left-0 -top-[1.4em] border-2 border-secondary-100 box-content p-.5 rounded-full bg-primary-100 text-2xl text-secondary-100" />
        <span className="font-inter font-medium text-sm sm:text-base text-wrap">
          {clue}
        </span>
      </motion.div>
      }
    </AnimatePresence>
  )
}
