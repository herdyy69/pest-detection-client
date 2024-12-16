'use client'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import debounce from 'debounce'

import { cn } from '@/lib/utils'
import Icons from '@/components/ui/icons'
import { useUpdateParams } from '@/hooks/useUpdateParams'

const TableSearch = ({ placeholder, name, className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const setParams = useUpdateParams()
  const searchName = name ? `search_${name}` : 'search'
  const value = searchParams.get(searchName)

  const handleSearch = debounce((e: any) => {
    setParams({ [searchName]: e.target.value, [name ? `page_${name}` : 'page']: '1' })
  }, 500)

  return (
    <div className={cn('relative', className)}>
      <Icons.Search className='w-5 h-5 text-text-grey absolute top-[50%] translate-y-[-50%] left-3' />
      <input
        ref={ref}
        className='form-input pl-9 pr-8 rounded-xl border-[#D0D5DD]'
        placeholder={placeholder ?? 'Search'}
        onChange={handleSearch}
        defaultValue={value ?? ''}
        {...rest}
      />
      {value && (
        <button
          onClick={() => {
            if (ref.current) ref.current.value = ''
            setParams({ [searchName]: '', page: '1' })
          }}
        >
          <Icons.X className='w-4 h-4 text-text-grey absolute top-[50%] translate-y-[-50%] right-3' />
        </button>
      )}
    </div>
  )
}

export default TableSearch
