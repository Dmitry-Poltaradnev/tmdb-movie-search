import { apiKey } from '../apiKeys.ts'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3/',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${apiKey}`)
    return headers
  },
})

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error) {
    console.error('API ERROR:', result.error)

    api.dispatch({
      type: 'globalError/setError',
      payload: result.error,
    })
  }

  return result
}
