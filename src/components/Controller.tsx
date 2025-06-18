import { useCallback } from "react"
import { useAppStore } from "../core"
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from "motion/react"
export default function Controller() {
    const { gameStatus } = useAppStore()
    const changeStatus = useCallback(() => {
        if (gameStatus === 'running') useAppStore.setState({ gameStatus: 'paused' })
        else useAppStore.setState({ gameStatus: 'running' })

    }, [gameStatus])
    return (
        <AnimatePresence>
            {
                gameStatus !== 'idle' && <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ ease: 'anticipate' }}
                    onClick={changeStatus}
                    className="m-2 p-2 bg-accent-red rounded-xl cursor-pointer opacity-85 hover:opacity-100 transition-all">
                    <Icon icon={gameStatus === 'paused' ? 'mdi:play' : 'mdi:pause'} className="text-xl aspect-square text-background-light" />
                </motion.button>
            }
        </AnimatePresence>
    )
}
