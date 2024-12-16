import * as React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className = '', ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => <thead ref={ref} className={cn(' [&_tr]:border-b', className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />,
)
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-neutral-30 data-[state=selected]:bg-neutral-30', className)}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-14 px-4 text-left align-middle plabs-caption-medium-sm text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
  ),
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className = '', ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'

const TableSkeleton = ({ totalColumns, totalRow = 10 }: { totalColumns: number; totalRow: number }) => {
  const convertToArr = (num: number) => {
    const arr = []
    for (let i = 1; i <= num; i++) {
      arr.push(i)
    }
    return arr
  }

  const columns = convertToArr(totalColumns)
  const rows = convertToArr(totalRow)

  return rows.map((index) => {
    return (
      <TableRow key={index}>
        {columns.map((j) => {
          return (
            <TableCell key={j} className='px-2 py-2' style={{ width: `${100 / columns.length}%` }}>
              <div className='bg-gray-300 animate-pulse h-10 rounded' />
            </TableCell>
          )
        })}
      </TableRow>
    )
  })
}

TableSkeleton.displayName = 'TableSkeleton'

const TableEmpty = ({ totalColumns }: { totalColumns: number }) => {
  return (
    <TableRow>
      <td className='px-4 py-5' colSpan={totalColumns}>
        <TableCell className='flex flex-col items-center min-h-[300px] justify-center gap-2'>
          <span className='text-greyscale-8 body-reguler-14'>Data tidak ditemukan</span>
        </TableCell>
      </td>
    </TableRow>
  )
}

TableEmpty.displayName = 'TableEmpty'

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption, TableSkeleton, TableEmpty }
