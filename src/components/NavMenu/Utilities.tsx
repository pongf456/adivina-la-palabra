import { Icon } from '@iconify/react'
import { useAppStore } from '../../core'
import { useCallback, useEffect, useMemo } from 'react'
import { useAnimate, motion } from 'motion/react'
export default function Utilities() {
  const store = useAppStore()
  const clueDisabled = useMemo(() => (!store.currentWord || store.currentClue) ? true : false, [store])
  const [scope, animate] = useAnimate<HTMLButtonElement>()
  const generateClue = useCallback(() => {
    useAppStore.setState({ currentClue: store.currentWord?.obtainClue() })
  }, [store])
  useEffect(() => {
    // Si clueDisabled es true, animar para ocultar y luego remover
    if (clueDisabled) {
      animate("div", {
        opacity: 0,
        display: 'none'
      }, { duration: 1, ease: "easeOut" })
        .then(async () => {
          await animate(scope.current, { width: 40,opacity:.7 }, { duration: .6 })
        })
    } else {

      animate(scope.current, { width: 80,opacity:1 }, { duration: .6 })
        .then(async () => {
          await animate("div", {
            opacity: 1,
            display: 'inline-block'
          }, { duration: 1, ease: "easeIn" })
        })
    }
  }, [clueDisabled]);
  return (
    <div className='m-2 self-center'>
      <button ref={scope} onClick={generateClue} disabled={clueDisabled} className=' overflow-hidden py-1 px-2 cursor-pointer rounded-xl mx-1 bg-accent-red/90 active:bg-accent-red flex gap-2 transition-colors text-background-light'>
        <Icon icon="mdi:lightbulb" className='text-2xl '  />
        <div>
          <span className='font-inter text-sm'>Pista</span>
        </div>
      </button>
    </div>
  )
}
