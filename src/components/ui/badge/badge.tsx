import * as React from 'react'

import { cn } from '@/lib/utils'

const green = ['relationship']
const red = ['complicated']
const blue = ['single']

const getBadgeColor = (status?: string) => {
  if (!status) return 'badge'
  if (green.includes(status.toLowerCase())) return 'badge badge-outline-green'
  if (red.includes(status.toLowerCase())) return 'badge badge-outline-red'
  if (blue.includes(status.toLowerCase())) return 'badge badge-outline-blue'
  return 'badge'
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: string
}

function Badge({ className, status, ...props }: BadgeProps) {
  return <div className={cn(getBadgeColor(status), [className])} {...props} />
}

export { Badge, getBadgeColor }
