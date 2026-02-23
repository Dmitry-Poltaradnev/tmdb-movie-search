import s from './FavoriteMoviesPage.module.css'
import { useSelector } from 'react-redux'
import { MovieCard } from '../../components/MovieCard/MovieCard.tsx'
import type { RootState } from '../../../../app/store.ts'
import type { MovieTypes } from '../../../../api/schema/movies.schema.ts'

export const FavoriteMoviesPage = () => {
  const favoritesMovies = useSelector((state: RootState) => state.favoriteMovies)
  const movies = useSelector((state: RootState) => state.favoriteMovies)
  return (
    <section className={s.favoriteMoviesPage}>
      {!movies.length && <p className={s.description}>Favorite movies list is empty</p>}
      {movies.map((movie: MovieTypes) => (
        <MovieCard key={movie.id} movie={movie} favoritesMovies={favoritesMovies} />
      ))}
    </section>
  )
}
