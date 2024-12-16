import { cn } from '@/lib/utils'
import Link from 'next/link'
import  Icons  from '@/components/ui/icons'

interface MenuActionProps {
  onDetail?: () => void
  onEdit?: () => void
  onDelete?: () => void
  detailHref?: string
  editHref?: string
  deleteHref?: string
  children?: any
  className?: string
}

const MenuAction = ({
  children,
  onDetail,
  onEdit,
  onDelete,
  detailHref,
  editHref,
  deleteHref,
  className,
}: MenuActionProps) => {
  return (
    <div className={cn('flex justify-center items-center gap-2', className)}>
      {(detailHref || onDetail) && <MenuActionButton href={detailHref} onClick={onDetail} iconType='detail' />}
      {(editHref || onEdit) && <MenuActionButton href={editHref} onClick={onEdit} iconType='edit' />}
      {onDelete && <MenuActionButton href={deleteHref} onClick={onDelete} iconType='delete' />}

      {children}
    </div>
  )
}

const MenuActionButton = ({
  href,
  onClick,
  className = '',
  text = '',
  iconType = '',
  ...props
}: {
  href?: string
  onClick?: () => void
  className?: string
  text?: string
  iconType?: string
}) => {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'detail':
        return <Icons.Info className='w-5 h-5 text-primary-2-500' />
      case 'edit':
        return <Icons.Pencil className='w-5 h-5 text-primary-2-500' />
      case 'delete':
        return <Icons.Trash className='w-5 h-5 text-error-500' />
      default:
        return <></>
    }
  }

  if (href) {
    return (
      <Link className={cn('btn-v2 hover:bg-primary-2-100 p-1 border-none', className)} href={href} {...props}>
        {getIcon(iconType)}
      </Link>
    )
  } else if (onClick) {
    return (
      <button
        className={cn('btn-v2 hover:bg-primary-2-100 p-1 border-none', className)}
        type='button'
        onClick={onClick}
        {...props}
      >
        {getIcon(iconType)}
      </button>
    )
  }
}

MenuAction.Button = MenuActionButton

export default MenuAction
