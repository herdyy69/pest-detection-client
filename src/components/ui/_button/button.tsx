import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { getIcon, IconType } from '@/components/ui/icons/iconType'

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'btn flex items-center justify-center gap-2',
      game: 'btn-game',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: IconType | React.ReactNode
  iconStyle?: string
  contentClassName?: string
  sharedClassName?: string
  iconPosition?: 'left' | 'right'
}

const renderChildren: React.FC = ({ icon, iconPosition, iconStyle, children }: ButtonProps) => {
  return (
    <>
      {icon && iconPosition === 'left'
        ? typeof icon === 'string'
          ? getIcon(icon as IconType, iconStyle)
          : icon
        : null}

      {children}

      {icon && iconPosition === 'right'
        ? typeof icon === 'string'
          ? getIcon(icon as IconType, iconStyle)
          : icon
        : null}
    </>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      contentClassName,
      sharedClassName,
      asChild = false,
      icon,
      variant,
      iconStyle,
      iconPosition = 'left',
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant }), variant === 'game' && sharedClassName, [className ?? 'btn-blue'])}
        ref={ref}
        {...props}
      >
        {variant === 'game' ? (
          <span
            className={cn(
              'btn-content flex items-center justify-center gap-2 h-full w-full',
              contentClassName,
              sharedClassName,
            )}
          >
            {renderChildren({ icon, iconPosition, iconStyle, children })}
          </span>
        ) : (
          renderChildren({ icon, iconPosition, iconStyle, children })
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button }
