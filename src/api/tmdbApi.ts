import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from '../apiKeys.ts'

export const api = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    // credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${apiKey}`)
      return headers
    },
  }),

  tagTypes: ['PopularMovies', 'UpcomingMovies', 'NowPlayingMovies', 'TopRatedMovies'],

  endpoints: (builder) => ({
    getPopularMovies: builder.query<any, void>({
      query: () => 'movie/popular',
      providesTags: ['PopularMovies'],
    }),
    getUpcomingMovies: builder.query<any, void>({
      query: () => 'movie/upcoming',
      providesTags: ['UpcomingMovies'],
    }),
    getNowPlayingMovies: builder.query<any, void>({
      query: () => 'movie/now_playing',
      providesTags: ['NowPlayingMovies'],
    }),
    getTopRatedMovies: builder.query<any, void>({
      query: () => 'movie/top_rated',
      providesTags: ['TopRatedMovies'],
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
} = api
