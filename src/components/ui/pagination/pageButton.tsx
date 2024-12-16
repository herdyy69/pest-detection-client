import { cn } from '@/lib/utils'

const PageButton = ({
  className,
  children,
  isActive,
  disabled = false,
  onClick,
}: {
  className?: string
  children?: any
  isActive?: boolean
  disabled?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className={cn(
        'flex items-center gap-2 px-4 py-2.5 transition-all duration-150 ease-in-out  disabled:cursor-not-allowed h-[40px] box-border',
        isActive && 'bg-primary-2-500 text-white',
        disabled
          ? 'cursor-not-allowed text-text-grey'
          : 'cursor-pointer hover:bg-primary-2-500 hover:text-white  active:bg-primary-2-600',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type='button'
    >
      {children}
    </button>
  )
}

export default PageButton
