import s from './FavoriteMoviesPage.module.css'
import { useSelector } from 'react-redux'
import { MovieCard } from '../../components/MovieCard/MovieCard.tsx'
import type { RootState } from '../../../../app/store.ts'
import type { MovieTypes } from '../../../../api/schema/movies.schema.ts'

export const FavoriteMoviesPage = () => {
  const movies = useSelector((state: RootState) => state.favoriteMovies)
  return (
    <section className={s.FavoriteMoviesPage}>
      <h3>Favorite Movies Page</h3>
      {!movies.length && <p>Empty favorite list</p>}
      {movies.map((movie: MovieTypes) => (
        <MovieCard key={movie.id} movie={movie} isFavorite />
      ))}
    </section>
  )
}
