import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from '../apiKeys.ts'
import type { MoviesTypes } from '../features/movies/components/MovieSection/MovieSection.tsx'
import type { MovieDetailsType } from '../features/movies/components/MoviePage/MoviePage.tsx'
import type { MovieCastType } from '../features/movies/components/ActorCard/ActorCard.tsx'
import type { GenreMovie, GenresResponse, VoteAverage } from '../types/types.ts'

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
    }),
    getUpcomingMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/upcoming',
      providesTags: ['UpcomingMovies'],
    }),
    getNowPlayingMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/now_playing',
      providesTags: ['NowPlayingMovies'],
    }),
    getTopRatedMovies: builder.query<MoviesTypes, void>({
      query: () => 'movie/top_rated',
      providesTags: ['TopRatedMovies'],
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
    // ===========================
    getFilteredMovies: builder.query<
      MoviesTypes,
      { genres: GenreMovie[]; vote_average: VoteAverage }
    >({
      query: ({ genres, vote_average }) => ({
        url: 'discover/movie',
        params: {
          with_genres: genres.map((i: GenreMovie) => i.id).join(','),
          'vote_average.gte': vote_average[0] / 10,
          'vote_average.lte': vote_average[1] / 10,
        },
      }),
      providesTags: ['FilteredMovies'],
    }),
    getGenresMovies: builder.query<GenresResponse, void>({
      query: () => 'genre/movie/list',
      providesTags: ['GenresMovies'],
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
