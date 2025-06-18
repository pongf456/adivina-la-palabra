import { useCallback } from 'react'
import { useAppStore } from '../core'
import WordInput from './WordInput'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import clsx from 'clsx'
export default function Starter() {
    const { currentWord, gameStatus, start, complete } = useAppStore((s) => s)
    const [scope, animate] = useAnimate<HTMLButtonElement>()
    const startCallback = useCallback(() => {
        if (scope.current) {
            animate('*', {
                opacity: 0,
            }).then(async () => {
                await animate(scope.current, {
                    width: 40,
                    height: 40,
                }, {
                    ease: 'anticipate'
                })
                start()
            })
        }
        else {
            start()
        }
    }, [])
    const successCallback = useCallback((letters: string[]) => {
        complete(letters)
    }, [])
    return (
        <AnimatePresence mode='wait'>
            {currentWord ? (
                <motion.div className={clsx(gameStatus !== 'running' && 'pointer-events-none')} exit={{ opacity: 0 }}>
                    <WordInput onSuccess={successCallback} word={currentWord} />
                </motion.div>
            ) :
                <motion.button exit={{ y: 30, opacity: 0 }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} ref={scope} key={'start-button'} onClick={startCallback} className='flex px-2 py-1 text-2xl items-center cursor-pointer hover:bg-accent-red bg-accent-red/80 active:bg-accent-red transition-colors font-inter font-bold text-background-light rounded-md shadow-sm'>
                    <span>Iniciar</span>
                    <Icon icon="mdi:play" className='text-4xl d' />
                </motion.button>
            }
        </AnimatePresence>
    )
}
