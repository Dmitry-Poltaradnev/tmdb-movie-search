import { createApi } from '@reduxjs/toolkit/query/react'
import type { MovieDetailsType } from '../features/movies/components/MoviePage/MoviePage.tsx'
import type { MovieCastType } from '../features/movies/components/ActorCard/ActorCard.tsx'
import type { GenreMovie, GenresResponse, VoteAverage } from '../types/types.ts'
import { baseQueryWithErrorHandling } from './baseQueryWithError.ts'
import { MoviesResponseSchema, type MoviesTypes } from './schema/movies.schema.ts'
import { validate } from './validate/validate.ts'

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
    getPopularMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/popular',
      providesTags: ['PopularMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    // =========
    getUpcomingMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/upcoming',
      providesTags: ['UpcomingMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getNowPlayingMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/now_playing',
      providesTags: ['NowPlayingMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getTopRatedMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/top_rated',
      providesTags: ['TopRatedMovies'],
      transformResponse: validate(MoviesResponseSchema),
    }),
    getMovieDetails: builder.query<MovieDetailsType, number>({
      query: (movie_id) => `movie/${movie_id}`,
      providesTags: ['MovieDetails'],
    }),
    getMovieActors: builder.query<MovieCastType, number>({
      query: (movie_id) => `movie/${movie_id}/credits`,
      providesTags: ['MovieActors'],
    }),
    getSimilarMovies: builder.query<MoviesTypes, number>({
      query: (movie_id) => `movie/${movie_id}/similar`,
      providesTags: ['SimilarMovies'],
    }),
    getMoviesByTitle: builder.query<MoviesTypes, string>({
      query: (title) => ({
        url: 'search/movie',
        params: {
          query: title,
        },
      }),
      providesTags: ['MoviesByTitle'],
    }),
    getGenresMovies: builder.query<GenresResponse, void>({
      query: () => 'genre/movie/list',
      providesTags: ['GenresMovies'],
    }),
    getFilteredMovies: builder.query<
      MoviesTypes,
      { genres: GenreMovie[]; vote_average: VoteAverage; sortValue: string }
    >({
      query: ({ genres, vote_average, sortValue }) => ({
        url: 'discover/movie',
        params: {
          with_genres: genres.map((i: GenreMovie) => i.id).join(','),
          'vote_average.gte': vote_average[0] / 10,
          'vote_average.lte': vote_average[1] / 10,
          sort_by: sortValue,
        },
      }),
      providesTags: ['FilteredMovies'],
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
