import { useCallback } from 'react'
import { useAppStore, Word, WordManager } from '../core'
import WordInput from './WordInput'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
export default function Starter() {
    const word = useAppStore((s) => s.currentWord)
    const [scope, animate] = useAnimate<HTMLButtonElement>()
    const start = useCallback(() => {
        if (scope.current) {
            animate('*', {
                opacity: 0,
            }).then(async () => {
                await animate(scope.current, {
                    width: 40,
                    height: 40,
                },{
                    ease:'anticipate'
                })
                useAppStore.setState({ currentWord: new Word(WordManager.getRandomWord()) })
            })
        }
        else {
            useAppStore.setState({ currentWord: new Word(WordManager.getRandomWord()) })
        }
    }, [])
    return (
        <AnimatePresence mode='wait'>
            {word ? (<WordInput onSuccess={start} word={word} />) :
                <motion.button exit={{ y: 30, opacity: 0 }} ref={scope} key={'start-button'} onClick={start} className='flex px-2 py-1 text-2xl items-center cursor-pointer hover:bg-accent-red bg-accent-red/80 active:bg-accent-red transition-colors font-inter font-bold text-background-light rounded-md shadow-sm'>
                    <span>Iniciar</span>
                    <Icon icon="mdi:play" className='text-4xl d' />
                </motion.button>
            }
        </AnimatePresence>
    )
}
