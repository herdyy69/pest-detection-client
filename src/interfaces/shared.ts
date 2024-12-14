export interface Option {
  label: string
  value: any
}

export interface Pagination {
  current_page: number
  per_page: number
  total_pages: number
  total_data: number
}

export interface BaseTableResponse<T> {
  message?: any
  data: T[]
  paginate: Pagination
}

export interface TotalData {
  count: number
}
