import { Header, Row, Table as TableType, flexRender } from '@tanstack/react-table'
import {
  Table as TableContainer,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from '.'
import { cn } from '@/lib/utils'
import Icons from '@/components/ui/icons'

interface TableProps<TData> {
  table: TableType<TData>
  isLoading?: boolean
  handleSort: (id: string) => void
  isServerSide?: boolean
  onRowClick?: (row: Row<TData>) => void
}

function Table<TData>({ table, isLoading, handleSort, isServerSide = true, onRowClick }: TableProps<TData>) {
  const sortToggler = (header: Header<TData, unknown>, event: any) => {
    // @ts-ignore
    const id = header.column.columnDef.id ?? header.column.columnDef.accessorKey
    const sortable = header.column.columnDef.enableSorting

    const toggleSortingHandler = header.column?.getToggleSortingHandler()
    if (toggleSortingHandler) {
      toggleSortingHandler(event)
    }

    if (id && sortable && isServerSide) {
      handleSort(id)
    }
  }

  return (
    <TableContainer>
      <TableHeader>
        {table.getHeaderGroups().map((header) => (
          <TableRow key={header.id}>
            {header.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ position: 'relative', width: header.getSize() }}
                  className='bg-secondary-1-50 text-primary-2-500 plabs-caption-semibold-sm'
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={(event) => sortToggler(header, event)}
                      className={`${
                        header.column.getCanSort() ? 'cursor-pointer ' : ''
                      } flex items-center gap-3 select-none`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() ? (
                        <div className='flex flex-col items-center justify-center '>
                          <Icons.ChevronUp
                            className={cn(
                              'w-1.5 h-1.5',
                              header.column.getIsSorted() === 'asc' ? 'text-primary-2-500' : 'text-text-grey',
                            )}
                          />
                          <Icons.ChevronUp
                            className={cn(
                              'w-1.5 h-1.5',
                              header.column.getIsSorted() === 'desc' ? 'text-primary-2-500' : 'text-text-grey',
                            )}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                    ></div>
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 && !isLoading ? (
          <TableEmpty totalColumns={table.getAllColumns().length} />
        ) : !table.getRowModel().rows.length || isLoading ? (
          <TableSkeleton totalRow={table.getState().pagination.pageSize} totalColumns={table.getAllColumns().length} />
        ) : (
          <>
            {table.getRowModel().rows.map((row) => {
              const isRead = (row?.original as any)?.is_read === false

              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.columnDef.size}px` }}
                        className={cn('py-3 px-4 plabs-caption-regular-sm text-text-black', {
                          'bg-primary-3-50': isRead, // Ganti warna background jika is_read === false
                        })}
                        onClick={() => {
                          if (onRowClick) {
                            onRowClick(row)
                          }
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </>
        )}
      </TableBody>
    </TableContainer>
  )
}

export default Table
