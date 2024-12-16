import { Table } from '@tanstack/react-table'
import Icons from '@/components/ui/icons'
import PageButton from '@/components/ui/pagination/pageButton'

interface TablePaginationProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  handleGoToPage: (page: number) => void
  handleSetPageRows: (limit: number) => void
  isServerSide: boolean
  pageSizeOptions?: number[]
}

export default function TablePagination<TData>({
  table,
  isLoading,
  handleGoToPage,
  handleSetPageRows,
  isServerSide,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalData = isServerSide ? table.getRowCount() : table?.options?.data?.length
  const totalPages = table.getPageCount()

  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      table.nextPage()
      handleGoToPage(pageIndex + 1)
    }
  }

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage()
      handleGoToPage(pageIndex - 1)
    }
  }

  const handleFirstPage = () => {
    table.firstPage()
    handleGoToPage(0)
  }
  const handleLastPage = () => {
    table.lastPage()
    handleGoToPage(totalPages - 1)
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    table.setPageSize(newSize)
    handleSetPageRows(newSize)
  }

  if (isLoading) {
    return null
  }

  return (
    <div data-table-pagination className='flex items-center justify-between flex-wrap gap-2 py-4 px-6'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-sm '>
          <div className='mr-2 plabs-caption-regular-12 text-text-grey'>Row per page :</div>
          <select
            className='h-7 rounded-lg border border-primary-2-500 text-primary-2-500 plabs-body-regular-12 p-1'
            value={pageSize}
            onChange={handleChangePageSize}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='plabs-caption-regular-12 text-text-grey'>
          {pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, totalData)} of {totalData}
        </div>

        <div className='flex flex-row items-center border border-text-stroke rounded-lg plabs-caption-medium-14 overflow-hidden'>
          <PageButton
            className='flex items-center gap-2 border-r border-text-stroke'
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.ArrowLeft className='w-4 h-4' />
            Previous
          </PageButton>

          {/* First page */}
          {pageIndex + 1 >= 4 && (
            <PageButton className='border-r border-text-stroke' onClick={handleFirstPage} isActive={pageIndex === 0}>
              1
            </PageButton>
          )}

          {/* Icon for more page */}
          {pageIndex + 1 >= 5 && (
            <PageButton
              className='border-r border-text-stroke text-text-grey'
              onClick={() => {
                const diff = pageIndex - 6
                if (diff > 0) {
                  table.setPageIndex(diff)
                  handleGoToPage(diff)
                } else {
                  handleFirstPage()
                }
              }}
            >
              <Icons.Dot />
            </PageButton>
          )}

          {/* 2 pages before */}
          {pageIndex + 1 - 2 > 0 && (
            <PageButton
              className='border-r border-text-stroke'
              onClick={() => {
                table.setPageIndex(pageIndex - 2)
                handleGoToPage(pageIndex - 2)
              }}
            >
              {pageIndex + 1 - 2}
            </PageButton>
          )}

          {/* 1 page before */}
          {pageIndex + 1 - 1 > 0 && (
            <PageButton
              onClick={() => {
                table.setPageIndex(pageIndex - 1)
                handleGoToPage(pageIndex - 1)
              }}
              className='border-r border-text-stroke'
            >
              {pageIndex + 1 - 1}
            </PageButton>
          )}

          {/* Current page */}
          <PageButton className='border-r border-text-stroke' isActive>
            {pageIndex + 1}
          </PageButton>

          {/* 1 page after */}
          {pageIndex + 1 + 1 <= totalPages && (
            <PageButton
              onClick={() => {
                table.setPageIndex(pageIndex + 1)
                handleGoToPage(pageIndex + 1)
              }}
              className='border-r border-text-stroke'
            >
              {pageIndex + 1 + 1}
            </PageButton>
          )}

          {/* 2 page after */}
          {pageIndex + 1 + 2 <= totalPages && (
            <PageButton
              onClick={() => {
                table.setPageIndex(pageIndex + 2)
                handleGoToPage(pageIndex + 2)
              }}
              className='border-r border-text-stroke'
            >
              {pageIndex + 1 + 2}
            </PageButton>
          )}

          {/* Icon for more page */}
          {pageIndex + 1 + 2 < totalPages - 1 && (
            <PageButton
              className='border-r border-text-stroke text-text-grey'
              onClick={() => {
                const jumpPage = pageIndex + 5
                if (jumpPage >= totalPages) {
                  handleLastPage()
                } else {
                  table.setPageIndex(jumpPage)
                  handleGoToPage(jumpPage)
                }
              }}
            >
              <Icons.Dot />
            </PageButton>
          )}

          {/* Last page */}
          {pageIndex + 1 + 2 < totalPages && (
            <PageButton onClick={handleLastPage} className='border-r border-text-stroke'>
              {totalPages}
            </PageButton>
          )}

          <PageButton className='flex items-center gap-2' onClick={handleNextPage} disabled={!table.getCanNextPage()}>
            Next
            <Icons.ArrowLeft className='w-4 h-4 rotate-180' />
          </PageButton>
        </div>
      </div>
    </div>
  )
}
