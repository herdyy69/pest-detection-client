import { cn } from '@/lib/utils'
import  Icons  from './index'

export type IconType = 'trash' | 'plus' | 'pen'

export const getIcon = (icon: IconType, iconStyle?: string) => {
  switch (icon) {
    case 'plus':
      return <Icons.Plus className={cn('w-4 h-4', iconStyle)} />
    case 'trash':
      return <Icons.Trash className={cn('w-4 h-4', iconStyle)} />
    case 'pen':
      return <Icons.Pencil className={cn('w-4 h-4', iconStyle)} />
    default:
      return null
  }
}
