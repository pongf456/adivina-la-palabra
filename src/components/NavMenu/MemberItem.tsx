import {Icon} from '@iconify/react'
interface Properties {
    name:string
}

export default function MemberItem({name}:Properties) {
  return (
    <div className="flex gap-1">
        <Icon icon='mdi:account' className='aspect-square text-2xl sm:text-3xl text-secondary-100' />
        <span className="font-inter underline font-medium text-sm sm:text-base text-secondary-100">{name}</span>
    </div>
  )
}
