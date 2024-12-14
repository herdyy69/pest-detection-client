import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DialogFormInterface {
  trigger: React.ReactNode
  titleDialog?: string
  color?: 'blue' | 'red'
  className?: string
  triggerClassName?: string
  confirmText?: string
  form?: string
  isLoading?: boolean
  onConfirm?: () => void
  rejectText?: string
  childrenClassName?: string
  open: boolean
  setOpen: (open: boolean) => void
}

const getColorStyle = (color: string) => {
  let style = {
    icon: 'text-primary-2-500 bg-primary-2-100',
    title: 'text-primary-2-500',
    body: 'text-text-grey',
    cancel: 'btn-outline-primary',
    confirm: 'btn-primary',
  }

  switch (color) {
    case 'red':
      style.icon = 'text-error-500 bg-error-100'
      style.confirm = 'btn-error'
      break
    default:
      break
  }

  return style
}

export const DialogForm = ({
  children,
  trigger,
  className,
  form,
  rejectText,
  confirmText,
  triggerClassName,
  color = 'blue',
  isLoading = false,
  onConfirm,
  titleDialog = 'Title Dialog',
  childrenClassName,
  open,
  setOpen,
  ...rest
}: DialogFormInterface & ButtonProps) => {
  const handleInteractOutside = (e: Event) => {
    e.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName} type='button' {...rest}>
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleInteractOutside}
        id='dialog-form'
        className={cn('max-w-xl hide-scrollbar !p-0', className)}
      >
        {titleDialog && (
          <DialogHeader className='border-b border-primary-2-100 px-6 py-4'>
            <DialogTitle>{titleDialog}</DialogTitle>
          </DialogHeader>
        )}

        <div className={cn('flex flex-col gap-2 p-6 max-h-[650px] overflow-y-auto', childrenClassName)}>{children}</div>
        <DialogFooter className='bg-white border-t border-primary-2-100'>
          <div className={'w-full flex justify-end py-4 px-4 gap-2'}>
            <Button
              className={cn('btn px-8 ', getColorStyle(color).cancel)}
              type='button'
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              {rejectText ?? 'Batal'}
            </Button>

            <Button
              className={cn('btn  px-8', getColorStyle(color).confirm)}
              disabled={isLoading}
              type={form ? 'submit' : 'button'}
              form={form}
              onClick={() => onConfirm && onConfirm()}
            >
              {confirmText ?? 'Simpan'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
