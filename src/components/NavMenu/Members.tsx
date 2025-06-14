import { useRef, useState } from "react";
import MemberItem from "./MemberItem";
import { Icon } from '@iconify/react'
import { AnimatePresence, motion, scale } from 'motion/react'
export default function Members() {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.button onClick={() => setOpen(!open)} className='p-1 font-inter text-sm sm:text-base mx-1 rounded-sm bg-primary-100  active:bg-primary-300 transition-colors cursor-pointer text-secondary-100 font-semibold'>
        {
          open ? <Icon icon='mdi:close' className="text-xl" /> : <span>Miembros</span>
        }
      </motion.button>
      <AnimatePresence>
        {open && <motion.div className="absolute top-full w-max gap-y-1 left-0 flex flex-col bg-primary-100 p-1 pr-4 rounded-md"
          initial={{
            opacity: 0,
            left: -10
          }}
          animate={{ opacity: 1, left: 0 }}
          exit={{ opacity: 0, left: 10 }}
        >
          <MemberItem name="Yeiderson Sequera" />
          <MemberItem name="Gregory Orozco" />
          <MemberItem name="Lenin Iguaran" />
          <MemberItem name="Endy Espinoza" />

        </motion.div>
        }
      </AnimatePresence>
    </>
  )
}
