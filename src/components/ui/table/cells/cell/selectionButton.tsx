import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@/components/ui/_button/button'

interface SelectionButtonProps {
  index: number | string
  value?: string
  className?: string
  children?: any
  disabled?: boolean
}
const blue = ['active']
const orange = ['verification']
const red = ['in-active']

const getButtonColor = (value?: string) => {
  if (!value) return ''
  if (blue.includes(value.toLowerCase())) return 'btn-primary'
  if (orange.includes(value.toLowerCase())) return 'btn-warning'
  if (red.includes(value.toLowerCase())) return 'btn-error'
  return ''
}

const SelectionButton = ({ children, index, className, value, disabled }: SelectionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectionButtonRef = useRef<any>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false)
    }

    const handleClickOutside = (e: any) => {
      if (selectionButtonRef.current && selectionButtonRef.current.contains(e.target)) {
        return
      }

      const haveDialogOpen = document.getElementById('dialog-confirmation')

      if (haveDialogOpen) {
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
  }, [selectionButtonRef])

  useEffect(() => {
    if (isOpen && selectionButtonRef.current && index) {
      const container = document.getElementById(`selection-button-${index}`)?.getBoundingClientRect()

      const left = container?.left ?? 0
      const top = (container?.top ?? 0) + (container?.height ?? 0)

      selectionButtonRef.current.style.left = `${left}px`
      selectionButtonRef.current.style.top = `${top}px`
      selectionButtonRef.current.style.width = `${container?.width}px`
    }
  }, [isOpen, index])

  return (
    <div className='relative'>
      <Button
        id={`selection-button-${index}`}
        onClick={handleToggle}
        className={cn('btn-sm whitespace-nowrap', getButtonColor(value), className)}
        icon='caret-down'
        iconPosition='right'
        iconStyle='w-4 h-4'
        disabled={disabled}
      >
        {value}
      </Button>
      {isOpen
        ? ReactDOM.createPortal(
            <div
              ref={selectionButtonRef}
              className='absolute bg-white flex flex-col rounded border border-primary-2-100 overflow-hidden'
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export default SelectionButton
