import s from './favoriteMoviesPage.module.css'
import { useParams } from 'react-router-dom'

export const FavoriteMoviesPage = () => {
  const { id } = useParams()

  return <section className={s.FavoriteMoviesPage}>FavoriteMoviesPage user id: {id}</section>
}
