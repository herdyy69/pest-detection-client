import { cn } from '@/lib/utils'
import { HTMLProps, useEffect, useRef } from 'react'

function Checkbox({
  indeterminate,
  className = '',
  titleClassName = '',
  target,
  title,
  ...rest
}: { indeterminate?: boolean; titleClassName?: string } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      <label className='relative flex items-center rounded cursor-pointer checkbox-table' htmlFor={target ?? 'check'}>
        <input
          ref={ref}
          type='checkbox'
          className={
            'peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-greyscale-5 transition-all bg-white checked:border-primary-2-500 checked:bg-primary-2-500 indeterminate:bg-primary-2-50 indeterminate:border-primary-2-500 indeterminate:after:content-[""] indeterminate:after:absolute indeterminate:after:w-2 indeterminate:after:h-[2.8px] indeterminate:after:top-[50%] indeterminate:after:left-[50%] indeterminate:after:translate-x-[-50%] indeterminate:after:translate-y-[-50%] indeterminate:after:rounded-full indeterminate:after:bg-primary-2-500'
          }
          id={target ?? 'check'}
          {...rest}
        />
        {title && <p className={cn('ml-2 text-primary-2-500 plabs-caption-regular-base', titleClassName)}>{title}</p>}
      </label>
    </div>
  )
}

export default Checkbox
