import { createApi } from '@reduxjs/toolkit/query/react'
import type { MovieCastType } from '../features/movies/components/ActorCard/ActorCard.tsx'
import type { VoteAverage } from '../types/types.ts'
import { baseQueryWithErrorHandling } from './baseQueryWithError.ts'
import { MoviesResponseSchema, type MoviesTypes } from './schema/movies.schema.ts'
import { validate } from './validate/validate.ts'
import { MovieDetailsSchema, type MovieDetailsType } from './schema/movieDetails.schema.ts'
import {
  GenreResponseSchema,
  type GenreResponseType,
  type GenreType,
} from './schema/genre.schema.ts'

export const api = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [
    'PopularMovies',
    'UpcomingMovies',
    'NowPlayingMovies',
    'TopRatedMovies',
    'MovieDetails',
    'MovieActors',
    'SimilarMovies',
    'MoviesByTitle',
    'FilteredMovies',
    'GenresMovies',
  ],

  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesTypes, number | void>({
      query: (page = 1) => ({
        url: 'movie/popular',
        params: {
          page,
        },
      }),
      providesTags: ['PopularMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getUpcomingMovies: builder.query<MoviesTypes, number | void>({
      query: (page = 1) => ({
        url: 'movie/upcoming',
        params: {
          page,
        },
      }),
      providesTags: ['UpcomingMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getNowPlayingMovies: builder.query<MoviesTypes, number | void>({
      query: (page = 1) => ({
        url: 'movie/now_playing',
        params: {
          page,
        },
      }),
      providesTags: ['NowPlayingMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getTopRatedMovies: builder.query<MoviesTypes, number | void>({
      query: (page = 1) => ({
        url: 'movie/top_rated',
        params: {
          page,
        },
      }),
      providesTags: ['TopRatedMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getMovieDetails: builder.query<MovieDetailsType, number>({
      query: (movie_id) => `movie/${movie_id}`,
      providesTags: ['MovieDetails'],
      transformResponse: validate(MovieDetailsSchema),
    }),
    getMovieActors: builder.query<MovieCastType, number>({
      query: (movie_id) => `movie/${movie_id}/credits`,
      providesTags: ['MovieActors'],
    }),
    getSimilarMovies: builder.query<MoviesTypes, number>({
      query: (movie_id) => `movie/${movie_id}/similar`,
      providesTags: ['SimilarMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getMoviesByTitle: builder.query<MoviesTypes, { title: string; page: number }>({
      query: ({ title, page = 1 }) => ({
        url: 'search/movie',
        params: {
          query: title,
          page,
        },
      }),
      providesTags: ['MoviesByTitle'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getGenresMovies: builder.query<GenreResponseType, void>({
      query: () => 'genre/movie/list',
      providesTags: ['GenresMovies'],
      transformResponse: validate(GenreResponseSchema),
    }),
    getFilteredMovies: builder.query<
      MoviesTypes,
      { genres: GenreType[]; vote_average: VoteAverage; sortValue: string; page: number | void }
    >({
      query: ({ genres, vote_average, sortValue, page = 1 }) => ({
        url: 'discover/movie',
        params: {
          with_genres: genres.map((i) => i.id).join(','),
          'vote_average.gte': vote_average[0] / 10,
          'vote_average.lte': vote_average[1] / 10,
          sort_by: sortValue,
          page: page,
        },
      }),
      providesTags: ['FilteredMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieActorsQuery,
  useGetSimilarMoviesQuery,
  useGetMoviesByTitleQuery,
  useGetGenresMoviesQuery,
  useGetFilteredMoviesQuery,
} = api
