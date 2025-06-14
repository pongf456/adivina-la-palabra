import {Icon} from '@iconify/react'
export default function Utilities() {
  return (
    <div className='m-2 self-center'>
        <button className='py-1 px-2 cursor-pointer rounded-xl mx-1 bg-accent-red flex gap-1 text-background-light'>
        <Icon icon="mdi:lightbulb" className='text-2xl '/>
        <span className='font-inter'>Pista</span>
        </button>
    </div>
  )
}
