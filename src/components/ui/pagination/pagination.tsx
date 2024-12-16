import React from 'react'
import PageButton from './pageButton'
import Icons from '@/components/ui/icons'

interface PaginationProps {
  page: number
  pageSize: number
  totalData: number
  totalPages: number
  isLoading?: boolean
  handleGoToPage: (page: number) => void
  handleSetPageRows: (limit: number) => void
  pageSizeOptions?: number[]
}

export default function Pagination({
  page,
  pageSize,
  totalData,
  totalPages,
  isLoading,
  handleGoToPage,
  handleSetPageRows,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: PaginationProps) {
  const canNextPage = page < totalPages
  const canPreviousPage = page > 1

  const handleNextPage = () => {
    if (canNextPage) {
      handleGoToPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      handleGoToPage(page - 1)
    }
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    handleSetPageRows(newSize)
  }

  if (isLoading) {
    return null
  }

  return (
    <div data-table-pagination className='flex items-center justify-between flex-wrap gap-2'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-sm '>
          <div className='mr-2 plabs-caption-regular-xs text-text-grey'>Row per page :</div>
          <select
            className='h-7 rounded-lg border border-primary-2-500 text-primary-2-500 plabs-body-regular-xs p-1'
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
        <div className='plabs-caption-regular-xs text-text-grey'>
          {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalData)} of {totalData}
        </div>

        <div className='flex flex-row items-center border border-text-stroke rounded-lg plabs-caption-medium-sm overflow-hidden'>
          <PageButton
            className='flex items-center gap-2 border-r border-text-stroke'
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            <Icons.ArrowLeft className='w-4 h-4' />
          </PageButton>

          <PageButton className='flex items-center gap-2' onClick={handleNextPage} disabled={!canNextPage}>
            <Icons.ArrowRight className='w-4 h-4' />
          </PageButton>
        </div>
      </div>
    </div>
  )
}
