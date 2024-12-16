import React from 'react'
import { cn } from '@/lib/utils'
import  Icons  from '@/components/ui/icons'

const getTypeActivity = (type: any, typeStyle?: string) => {
  switch (type.toLowerCase()) {
    case 'event':
      return (
        <div className='h-9 w-9 rounded-full bg-primary-4-500 text-white inline-flex items-center justify-center'>
          <Icons.Calendar className={cn('w-5 h-5', typeStyle)} />
        </div>
      )
    case 'test':
      return (
        <div className='h-9 w-9 rounded-full bg-secondary-2-500 text-white inline-flex items-center justify-center'>
          <Icons.Book className={cn('w-5 h-5', typeStyle)} />
        </div>
      )
    case 'authentication':
      return (
        <div className='h-9 w-9 rounded-full bg-primary-2-200 text-white inline-flex items-center justify-center'>
          <Icons.CircleUser className={cn('w-5 h-5', typeStyle)} />
        </div>
      )
    default:
      const name = type
        .split(' ')
        .map((name: string) => name.charAt(0))
        .join('')

      return (
        <div className='h-9 w-9 uppercase rounded-full bg-secondary-3-500 text-white inline-flex items-center justify-center'>
          {name}
        </div>
      )
  }
}

const Name = (props: any) => {
  const { value, description, type } = props

  return (
    <div className='flex items-center gap-2.5'>
      {type && getTypeActivity(type)}
      <div className='flex flex-col gap-px'>
        <h2 className='plabs-caption-semibold-sm text-text-black'>{value}</h2>
        {description && <p className='plabs-caption-regular-xs text-text-grey'>{description}</p>}
      </div>
    </div>
  )
}

export default Name
