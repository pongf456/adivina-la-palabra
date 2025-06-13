import { useMemo } from 'react'
import './styles.css'
import { ClueLevels, Word } from '../../core'
export default function Dialog() {
  const word = useMemo(() => new Word('Investigación'),[])
  return (
    <button className='p-1 bg-amber-300 cursor-pointer text-primary border-2 border-amber-300 rounded-md opacity-90 hover:opacity-100 transition-colors' onClick={() => alert(word.word)}>
        {word.obtainClue(ClueLevels.high).replace(/ /gm,'_')}
    </button>
  )
}
