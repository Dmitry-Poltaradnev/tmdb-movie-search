import { useNavigate, useParams } from 'react-router-dom'
import s from './MoviePage.module.css'
import {
  useGetMovieActorsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '../../../api/tmdbApi.ts'
import { ActorCard } from './ActorCard/ActorCard.tsx'
import { MovieCard } from '../MovieCard/MovieCard.tsx'

export const MoviePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: movie } = useGetMovieDetailsQuery(id)
  const { data: people } = useGetMovieActorsQuery(id)
  const { data: similarMovies } = useGetSimilarMoviesQuery(id)

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
        {genres?.map((item: any) => (
          <li key={item.id}> {item.name} </li>
        ))}
      </ul>
      <ul className={s.actorsList}>
        {people?.cast.map((actor: any, i: number) =>
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
              {similarMovies.results.map((movie: any, i: number) =>
                i < 6 ? <MovieCard key={movie.id} movie={movie} /> : null
              )}
            </ul>
          )}
        </div>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}
