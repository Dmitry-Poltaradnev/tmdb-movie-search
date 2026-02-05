import { useNavigate, useParams } from 'react-router-dom'
import s from './MoviePage.module.css'
import {
  useGetMovieActorsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import { ActorCard } from '../ActorCard/ActorCard.tsx'
import { MovieCard } from '../MovieCard/MovieCard.tsx'
import type { MovieType } from '../../../favorites/favoritesSlices.ts'

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

  if (!movie) return <div>Loading...</div>
  return (
    <div className={s.moviePage}>
      <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="moviePoster" />
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
              {similarMovies.results.map((movie: MovieType, i: number) =>
                i < 6 ? <MovieCard key={movie.id} movie={movie} isFavorite={false} /> : null
              )}
            </ul>
          )}
        </div>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}
