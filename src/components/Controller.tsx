import { useCallback } from "react"
import { useAppStore } from "../core"
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from "motion/react"
export default function Controller() {
    const { gameStatus, currentRecord } = useAppStore()
    const changeStatus = useCallback(() => {
        if (gameStatus === 'running') useAppStore.setState({ gameStatus: 'paused' })
        else useAppStore.setState({ gameStatus: 'running' })

    }, [gameStatus])
    return (
        <section className="w-full pb-2 px-2 h-10 flex gap-2 items-center justify-between">
            <div className="flex  gap-1 items-center justify-center text-secondary-200">
                <Icon icon="mdi:star-three-points" className=" text-2xl" />
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={currentRecord}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="text-sm font-inter font-bold">{currentRecord}</motion.span>
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {
                    gameStatus !== 'idle' && <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ ease: 'anticipate' }}
                        onClick={changeStatus}
                        className="p-2 bg-accent-red rounded-xl cursor-pointer opacity-85 hover:opacity-100 transition-all">
                        <Icon icon={gameStatus === 'paused' ? 'mdi:play' : 'mdi:pause'} className="text-xl aspect-square text-background-light" />
                    </motion.button>
                }
            </AnimatePresence>
        </section>
    )
}
