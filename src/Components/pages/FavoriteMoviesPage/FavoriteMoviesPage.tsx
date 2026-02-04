import s from './FavoriteMoviesPage.module.css'
import { useSelector } from 'react-redux'
import type { RootState } from '@reduxjs/toolkit/query'
import { MovieCard } from '../../Movie/MovieCard/MovieCard.tsx'
import type { MovieType } from '../../../features/favorites/favoritesSlices.ts'

export const FavoriteMoviesPage = () => {
  const movies = useSelector((state: RootState) => state.favoriteMovies)
  return (
    <section className={s.FavoriteMoviesPage}>
      <h3>Favorite Movies Page</h3>
      {!movies.length && <p>Empty favorite list</p>}
      {movies.map((movie: MovieType) => (
        <MovieCard key={movie.id} movie={movie} isFavorite />
      ))}
    </section>
  )
}
