import { useRef, useState } from "react";
import MemberItem from "./MemberItem";
import { AnimatePresence, motion, scale } from 'motion/react'
export default function Members() {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <div onTouchCancel={handleMouseLeave} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleMouseEnter} onTouchEnd={handleMouseLeave}>
      <button className='p-1 select-none font-inter text-sm sm:text-base mx-1 rounded-sm border-2 border-secondary-100 bg-primary-100  active:bg-primary-300 hover:bg-primary-300 transition-colors cursor-pointer text-secondary-100 font-semibold'>
        <span>Miembros</span>
      </button>
      <AnimatePresence>
        {open && <motion.div className="absolute top-full w-max gap-y-1 left-0 flex flex-col border-2 border-secondary-100 bg-primary-100 p-1 pr-4 rounded-md"
          initial={{
            opacity: 0,
            left: -10
          }}
          animate={{ opacity: 1, left: 0 }}
          exit={{ opacity: 0, left: 10 }}
          transition={{ delay: .3 }}
        >
          <MemberItem name="Yeiderson Sequera" />
          <MemberItem name="Gregory Orozco" />
          <MemberItem name="Lenin Iguaran" />
          <MemberItem name="Endy Espinoza" />

        </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
