import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import  Icons  from '@/components/ui/icons'

interface DropdownActionProps {
  children?: any
  detailHref?: string
  editHref?: string
  onDetail?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const DropdownAction = ({ children, detailHref, onDetail, editHref, onEdit, onDelete }: DropdownActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<any>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const refContent = useRef<any>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false)
    }

    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
        return
      }

      const haveDialogOpen = document.getElementById('dialog-confirmation')
      const haveDialogFormOpen = document.getElementById('dialog-form')

      if (haveDialogOpen || haveDialogFormOpen) {
        return
      }

      setIsOpen(false)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleClickOutside)
    document.addEventListener('wheel', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleClickOutside)
      document.removeEventListener('wheel', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    if (isOpen && refContent.current) {
      const rect = refContent.current.getBoundingClientRect()
      const newPosition = {
        top: rect.bottom + window.scrollY,
        left: rect.left + (window.scrollX + rect.width),
      }
      setPosition(newPosition)
    }
  }, [isOpen])

  return (
    <div className='relative'>
      <button ref={refContent} type='button' onClick={handleToggle} className='text-primary-2-500'>
        <Icons.EllipsisVertical className='w-5 h-5' />
      </button>
      {isOpen
        ? ReactDOM.createPortal(
            <div
              ref={dropdownRef}
              className='absolute bg-white flex flex-col items-start rounded border border-primary-2-100'
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-130%) translateY(-30%)',
              }}
            >
              {(detailHref || onDetail) && (
                <DropdownActionButton
                  text='View'
                  iconType='detail'
                  href={detailHref}
                  onClick={onDetail}
                  className='btn-text-primary h-[38px] w-full'
                />
              )}
              {(editHref || onEdit) && (
                <DropdownActionButton
                  text='Edit'
                  iconType='edit'
                  href={editHref}
                  onClick={onEdit}
                  className='btn-text-warning h-[38px] w-full'
                />
              )}
              {onDelete && <DropdownActionButton text='Delete' iconType='delete' onClick={onDelete} />}
              {children}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export default DropdownAction

export const DropdownActionButton = ({
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
        return <Icons.Pencil className='w-5 h-5 text-warning-500' />
      case 'delete':
        return <Icons.Trash className='w-5 h-5 text-error-500' />
      default:
        return <></>
    }
  }

  if (href) {
    return (
      <Link
        className={cn(
          'btn-v2 relative text-text-black plabs-caption-regular-sm hover:bg-primary-2-100 flex items-center gap-2 rounded-none',
          className,
        )}
        href={href}
        {...props}
      >
        {getIcon(iconType)}
        {text}
      </Link>
    )
  } else if (onClick) {
    return (
      <button
        className={cn(
          'relative  text-text-black plabs-caption-regular-sm px-3 py-2 cursor-pointer hover:bg-primary-2-100 flex items-center gap-2',
          className,
        )}
        type='button'
        onClick={onClick}
        {...props}
      >
        {getIcon(iconType)}
        {text}
      </button>
    )
  }
}
