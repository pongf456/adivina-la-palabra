import { AnimatePresence, motion } from "motion/react";
import { useAppStore, type Status } from "../core";
import { useEffect, useRef, useState } from "react";
export default function () {
    const { gameStatus, record } = useAppStore()
    const [gameOver, setGameOver] = useState(false)
    const previousGameStatus = useRef<Status>(gameStatus)
    useEffect(() => {
        if (gameStatus === 'running') {
            setGameOver(false);
        }
        else if (gameStatus === 'idle' && previousGameStatus.current === 'running') {
            setGameOver(true);
        }
        previousGameStatus.current = gameStatus;
    }, [gameStatus]);
    return (
        <AnimatePresence>
            {gameOver && <motion.div
                initial={{
                    x: -10,
                    scale: 0.9,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: 1
                    }
                }}
                exit={{
                    x: 10,
                    scale: 0.9,
                    opacity: 0
                }}
                className="absolute flex flex-col items-center justify-center">
                <span className="font-inter font-bold text-6xl text-accent-red">¡Perdiste!</span>
                <div className="font-inter truncate font-medium text-secondary-100 text-base">
                    <span>Alcanzaste <span className="text-accent-red">{record}</span> adivinanzas.</span>
                </div>
            </motion.div>}
        </AnimatePresence>
    )
}
