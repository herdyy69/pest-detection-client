import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useUpdateParams } from './useUpdateParams'
import { castToNumberOrKeepString } from '@/lib/cast'

const initialValues = {
  page: 1,
  limit: 10,
  sort: '',
  order_by: '',
  search: undefined,
}

export const useFilterTable = ({
  name,
  filterKeys,
  filterArray,
  defaultValues = initialValues,
  persistPage = false,
}: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const setParams = useUpdateParams()

  const getValueFromSearchParams = (key: string, persistDataStructure: boolean = false) => {
    const filterValue = searchParams.getAll(key).map((value: any) => castToNumberOrKeepString(value))

    if (key.includes('search')) {
      return searchParams.get(key)
    }

    if (filterValue.length === 0) {
      return
    }

    return filterValue.length > 1 || persistDataStructure ? filterValue : filterValue[0]
  }

  const params = useMemo(() => {
    // Helper function to get value from search params
    const getSearchParamValue = (key: string, asArray: boolean = false) => {
      return getValueFromSearchParams(key, asArray)
    }

    // Initialize the filter objects
    const filterDefault = { ...defaultValues }
    const filterParams: { [key: string]: any } = {}
    const filterValues: { [key: string]: any } = {}

    // Populate filterDefault and filterParams with default values and search params
    Object.keys(defaultValues).forEach((defaultKey) => {
      const key = name ? `${defaultKey}_${name}` : defaultKey
      const value = getSearchParamValue(key)

      // Set default and params
      filterDefault[defaultKey] = value ?? defaultValues[defaultKey]
      filterParams[defaultKey] = value ?? defaultValues[defaultKey]
    })

    // Process filterKeys if provided
    filterKeys?.forEach((defaultKey: any) => {
      const key = name ? `${defaultKey}_${name}` : defaultKey
      const value = getSearchParamValue(key, filterArray?.includes(defaultKey))

      // Set filter values and params
      filterValues[defaultKey] = value
      filterParams[defaultKey] = value
    })

    return { filterParams, filterDefault, filterValues }
  }, [searchParams, filterKeys, defaultValues, name, filterArray])

  const saveFilter = (filterParams: any) => {
    let filters: any = {}

    Object.entries(filterParams).forEach(([defaultKey, value]) => {
      if (filterKeys && !filterKeys.includes(defaultKey)) return

      const key = name ? `${defaultKey}_${name}` : defaultKey
      filters[key] = value
    })

    if (persistPage) {
      filters[name ? `page_${name}` : 'page'] = 1
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value === '') {
        delete filters[key]
      }
    })

    setParams(filters)
  }

  const resetFilter = () => {
    const defaultQuery: any = {}
    const urlParams = new URLSearchParams()

    if (params?.filterDefault) {
      Object.entries(params.filterDefault).forEach(([key, value]) => {
        if (value && key !== 'page' && key !== 'limit') {
          defaultQuery[key] = value
          urlParams.set(key, String(value))
        }
      })
    }

    // Create URL with only default query parameters
    const url = Object.keys(defaultQuery).length > 0 ? `${pathname}?${urlParams.toString()}` : pathname
    router.push(url)
  }

  return {
    filterValues: params?.filterValues,
    filter: params?.filterParams,
    saveFilter,
    resetFilter,
  }
}
