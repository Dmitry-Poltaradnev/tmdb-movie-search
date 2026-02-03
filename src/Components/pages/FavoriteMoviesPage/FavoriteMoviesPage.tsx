import s from './FavoriteMoviesPage.module.css'
import { useSelector } from 'react-redux'
import type { RootState } from '@reduxjs/toolkit/query'

export const FavoriteMoviesPage = () => {
  const movies = useSelector((state: RootState) => state.favoriteMovies)

  return <section className={s.FavoriteMoviesPage}>FavoriteMoviesPage</section>
}
