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
import type { ActorType } from '../../../../api/schema/actor.schema.ts'
import type { GenreType } from '../../../../api/schema/genre.schema.ts'

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
      <div className={s.movieInfoWrap}>
        <img
          className={s.moviePoster}
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
              : 'https://placehold.co/400x300?text=No+Photo'
          }
          alt="Movie Poster"
        />
        <div className={s.movieInfo}>
          <p className={s.movieTitle}>Title: {title}</p>
          <div className={s.desc}>
            <p>Release data: {release_date}</p>
            <p>Movie duration: {runtime} m</p>
            <p>Rating: {vote_average?.toFixed(1)}</p>
          </div>
          <div className={s.genresWrap}>
            <p className={s.blockTitle}>Genres:</p>
            <ul className={s.genresList}>
              {genres?.map((item: GenreType) => (
                <li className={s.genre} key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <p>{overview}</p>
        </div>
      </div>
      <div className={s.actorsWrap}>
        <p className={`${s.blockTitle} ${s.secondTitle}`}>Actors</p>
        <ul className={s.actorsList}>
          {people?.cast.map((actor: ActorType, i: number) =>
            i < 6 ? <ActorCard key={actor.id} actor={actor} /> : null
          )}
        </ul>
      </div>
      <div>
        <p className={`${s.blockTitle} ${s.secondTitle}`}>Similar movies</p>
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
      <Button classNames={s.returnBtn} title={'Back'} callBack={() => navigate(-1)} />
    </div>
  )
}
