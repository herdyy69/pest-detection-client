import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../form/popover/popover'
import { Option } from '@/interfaces/shared'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandOptions,
} from '../command/command'
import { Badge } from '../badge/badge'
import { useMemo, useState } from 'react'
import  Icons  from '@/components/ui/icons'

const Combobox = ({
  value,
  error = false,
  multiple = false,
  createable = false,
  options,
  isOptionsLoading = false,
  placeholder,
  searchPlaceholder,
  className,
  disabled,
  onChange,
}: {
  value?: any
  error?: boolean
  multiple?: boolean
  createable?: boolean
  disabled?: boolean
  options: Option[]
  isOptionsLoading?: boolean
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  onChange: any
}) => {
  const [search, setSearch] = useState('')
  const [localOptions, setLocalOptions] = useState<Option[]>(options)

  const availableOption = options.some((option) => option.label.toLowerCase().includes(search.toLowerCase()))

  const handleCreateOption = () => {
    let newValues = value ? [...value] : []
    const newOption = { value: search, label: search }
    setLocalOptions((prevOptions) => [...prevOptions, newOption])
    onChange([...newValues, search])
    setSearch('')
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            role='combobox'
            className={cn(
              'form-input flex items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#F2F2F2] disabled:bg-[#F8F9FB] disabled:text-[#C7C7C8]',
              !value && 'text-muted-foreground',
              error && 'error',
              className,
            )}
            disabled={disabled || isOptionsLoading}
          >
            {multiple
              ? value?.length
                ? `${value.length} selected`
                : placeholder
              : value
              ? localOptions?.find((option) => option?.value === value)?.label
              : placeholder}
            <Icons.ChevronDown className={cn('w-4 h-4')} />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start' onInteractOutside={() => setSearch('')}>
          <Command>
            <CommandInput
              placeholder={searchPlaceholder ?? 'Search...'}
              onChangeCapture={(e: any) => setSearch(e.target.value)}
            />
            <CommandList>
              {createable && multiple && !availableOption ? (
                <div
                  className={cn(
                    "relative flex cursor-pointer hover:bg-[#f5f5f5] items-center rounded-sm px-2 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
                    className,
                  )}
                  onClick={handleCreateOption}
                >{`Create "${search}"`}</div>
              ) : (
                <CommandEmpty>No options found.</CommandEmpty>
              )}
              <CommandGroup>
                <CommandOptions options={localOptions} value={value} onChange={onChange} multiple={multiple} />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {multiple && value?.length > 0 && (
        <div className='flex gap-2'>
          {Array.isArray(value) &&
            value?.map((val: string) => (
              <Badge key={val} className='flex items-center justify-between gap-2'>
                <span>{localOptions.find((option) => option.value === val)?.label}</span>
                <button
                  type='button'
                  onClick={() => {
                    const newValue = value.filter((item: string) => item !== val)
                    onChange(newValue)
                  }}
                >
                  <Icons.X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
        </div>
      )}
    </>
  )
}

export default Combobox
