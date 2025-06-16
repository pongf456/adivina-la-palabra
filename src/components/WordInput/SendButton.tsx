import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@iconify/react'
import { useCallback, useEffect, useState } from 'react'
interface Properties {
    index: number
    submit: () => boolean
}
function AnimatedIcon({ name }: { name: string }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 10
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            exit={{
                opacity: 0,
                x: 10
            }}>
            <Icon icon={name} />
        </motion.div>
    )
}

export default function SendButton({ index, submit }: Properties) {
    const [status, setStatus] = useState<'none' | 'success' | 'fail'>('none')
    useEffect(() => {
        if (status === 'fail') {
            const timeout = setTimeout(() => {
                setStatus('none')
            }, 500);
            return () => clearTimeout(timeout)
        }
    }, [status])
    const click = useCallback(() => {
        const result = submit()
        if (result) setStatus('success')
        else setStatus('fail')
    }, [submit])
    return (
        <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.2 * index }}
            onClick={click} className="w-10 h-10 flex items-center justify-center bg-accent-red text-2xl text-background-light cursor-pointer">
            <AnimatePresence mode='wait'>
                {
                    status === 'none' ? <AnimatedIcon key={'none'} name='mdi:send-variant' /> :
                        status === 'success' ? <AnimatedIcon key={'success'} name='mdi:check' />
                            : <AnimatedIcon key={'error'} name='mdi:close' />
                }
            </AnimatePresence>
        </motion.button>
    )
}
