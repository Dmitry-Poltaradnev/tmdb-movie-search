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

  tagTypes: [
    'PopularMovies',
    'UpcomingMovies',
    'NowPlayingMovies',
    'TopRatedMovies',
    'MovieDetails',
    'FavoriteMovies',
  ],

  endpoints: (builder) => ({
    getAccountDetails: builder.query<any, string>({
      query: (sessionId) => `/account?session_id=${sessionId}`,
    }),
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
    getMovieDetails: builder.query<any, number>({
      query: (movie_id) => `movie/${movie_id}`,
      providesTags: ['MovieDetails'],
    }),
    getFavoriteMovies: builder.query<string, void>({
      query: (account_id) => `/account/${account_id}/favorite/movies`,
      providesTags: ['FavoriteMovies'],
    }),
  }),
})

export const {
  useGetAccountDetailsQuery,
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
  useGetFavoriteMoviesQuery,
} = api
