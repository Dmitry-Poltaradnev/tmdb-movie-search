import { useEffect, useState } from 'react'
import type { VoteAverage } from '@/types/types.ts'

export const useDebounceRating = (value: VoteAverage, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceValue
}
