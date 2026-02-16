import { useNavigate, useParams } from 'react-router-dom'
import s from './MoviePage.module.css'
import {
  useGetMovieActorsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import { ActorCard } from '../ActorCard/ActorCard.tsx'
import { MovieCard } from '../MovieCard/MovieCard.tsx'

import { Button } from '../../../../Components/ui/Button/Button.tsx'
import { MoviePageSkeleton } from '../../../../Components/ui/Skeletons/MoviePageSkeleton/MoviePageSkeleton.tsx'
import type { MovieTypes } from '../../../../api/schema/movies.schema.ts'

export type GenreType = {
  id: number
  name: string
}
export type ActorType = {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

export type MovieDetailsType = {
  backdrop_path: string
  genres: GenreType[]
  overview: string
  runtime: number
  title: string
  vote_average: number
  release_date: string
}

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = id ? Number(id) : 0

  const navigate = useNavigate()

  const { data: movie } = useGetMovieDetailsQuery(movieId)
  const { data: people } = useGetMovieActorsQuery(movieId)
  const { data: similarMovies } = useGetSimilarMoviesQuery(movieId)

  const { backdrop_path, genres, overview, runtime, title, vote_average, release_date } =
    movie || {}

  if (!movie || !people || !similarMovies) {
    return <MoviePageSkeleton />
  }
  return (
    <div className={s.moviePage}>
      <img
        className={s.moviePoster}
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
            : 'https://placehold.co/400x300'
        }
        alt="Movie Poster"
      />
      <h4>Title: {title}</h4>
      <p>Release data: {release_date}</p>
      <p>Rating: {vote_average}</p>
      <ul className={s.genresList}>
        Genres:
        {genres?.map((item: GenreType) => (
          <li key={item.id}> {item.name} </li>
        ))}
      </ul>
      <ul className={s.actorsList}>
        {people?.cast.map((actor: ActorType, i: number) =>
          i < 6 ? <ActorCard key={actor.id} actor={actor} /> : null
        )}
      </ul>
      <p>Movie duration: {runtime} m</p>
      <p>Description: {overview}</p>
      <div>
        <p>Similar movies:</p>
        <div>
          {!similarMovies ? (
            <p>We don't have similar movies</p>
          ) : (
            <ul className={s.similarMoviesWrap}>
              {similarMovies.results.map((movie: MovieTypes, i: number) =>
                i < 6 ? <MovieCard key={movie.id} movie={movie} isFavorite={false} /> : null
              )}
            </ul>
          )}
        </div>
      </div>
      <Button title={'Back'} callBack={() => navigate(-1)} />
    </div>
  )
}
