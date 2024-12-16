import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useUpdateParams = (): ((value: { [key: string]: any | undefined }) => void) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isRendered, setIsRendered] = useState(false)

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const updateParams = useCallback(
    (value: { [key: string]: any | undefined }) => {
      if (!isRendered) return

      const params = new URLSearchParams(searchParams.toString())

      const isEmpty = Object.keys(value).length === 0

      if (isEmpty) {
        params.forEach((_, key) => {
          params.delete(key)
        })
      } else {
        params.forEach((value, key) => {
          if (value !== '') {
            params.set(key, value)
          }
        })

        Object.entries(value).forEach(([key, val]) => {
          if (val !== undefined || val !== null || val !== '') {
            const isArray = Array.isArray(val)

            // Clear existing values for the key
            params.delete(key)

            if (isArray) {
              // Append each item in the array
              val.forEach((item: any) => {
                if (item !== '') {
                  params.append(key, item)
                }
              })
            } else {
              params.set(key, val)
            }
          } else {
            params.delete(key)
          }
        })
      }

      // Create the URL with updated search params
      const url = `${pathname}?${params.toString()}`

      // Use router.push with the new URL
      router.push(url)
    },
    [router, pathname, isRendered],
  )

  useEffect(() => {
    if (isRendered) return
    setIsRendered(true)
  }, [isRendered])

  return updateParams
}
