import { useCallback, useEffect } from 'react'
import { useAppStore, Word, WordManager } from '../core'
import WordInput from './WordInput'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'motion/react'
export default function Starter() {
    const word = useAppStore((s) => s.currentWord)
    const start = useCallback(() => {
        useAppStore.setState({ currentWord: new Word(WordManager.getRandomWord()) })
    }, [])
    return (
        <AnimatePresence mode='wait'>
            {word ? (<WordInput onSuccess={start} word={word} />) :
                <motion.button key={'start-button'} initial={{ opacity: 0, position:'relative' }} animate={{ opacity: 1 }} exit={{
                    opacity: 0,
                    top: 100
                }} onClick={start} className='flex px-2 py-1 text-2xl items-center cursor-pointer hover:bg-accent-red bg-accent-red/80 active:bg-accent-red transition-colors font-inter font-bold text-background-light rounded-md shadow-sm'>
                    <span>Iniciar</span>
                    <Icon icon="mdi:play" className='text-4xl' />
                </motion.button>
            }
        </AnimatePresence>
    )
}
