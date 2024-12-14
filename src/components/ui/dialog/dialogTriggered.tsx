'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog/dialog'
import { cn } from '@/lib/utils'

const DialogTriggered: React.FC<{
  children: React.ReactNode
  open: boolean
  className?: string
}> = ({ children, open, className }) => {
  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent className={cn(className, 'lg:max-h-[640px] overflow-hidden flex flex-col')}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogTriggered
