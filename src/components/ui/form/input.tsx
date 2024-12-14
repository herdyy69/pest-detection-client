import * as React from 'react'

import { cn } from '@/lib/utils'
import  Icons  from '@/components/ui/icons'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'form-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          [ariaInvalid && 'error', className],
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className='relative'>
      <Input {...props} ref={ref} className={cn('pr-8', className)} type={showPassword ? 'text' : 'password'} />
      <span className='absolute top-3 right-3 cursor-auto select-none text-greyscale-6'>
        {showPassword ? (
          <Icons.EyeIcon onClick={() => setShowPassword(false)} className='w-4 h-4' />
        ) : (
          <Icons.EyeOffIcon onClick={() => setShowPassword(true)} className='w-4 h-4' />
        )}
      </span>
    </div>
  )
})

InputPassword.displayName = 'InputPassword'

const InputNumber = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, min = -Infinity, max = Infinity, ...props }, ref) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      // Allow digits, commas, periods, and a minus sign only if min is provided and is negative
      const numericValue = newValue.replace(min !== -Infinity ? /[^0-9.,-]/g : /[^0-9.,]/g, '')

      // Parse the numeric value and enforce min and max limits
      const numericValueAsNumber = parseFloat(numericValue.replace(/,/g, ''))

      if (!isNaN(numericValueAsNumber)) {
        if (numericValueAsNumber > +max) {
          e.target.value = max.toString()
        } else if (numericValueAsNumber < +min) {
          e.target.value = min.toString()
        } else {
          e.target.value = numericValue
        }
      } else {
        e.target.value = ''
      }

      if (props.onChange) props.onChange(e)
    }

    return (
      <Input
        {...props}
        ref={ref}
        onChange={onChange}
        className={className}
        type='number'
        onWheel={(e: any) => {
          e.target.blur()
          e.stopPropagation()
          setTimeout(() => {
            e.target.focus()
          }, 0)
        }}
      />
    )
  },
)

InputNumber.displayName = 'InputNumber'

export { Input, InputPassword, InputNumber }
