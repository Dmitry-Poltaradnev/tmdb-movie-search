import { useParams } from 'react-router-dom'
import s from './moviePage.module.css'

export const MoviePage = () => {
  const { id } = useParams()
  return <div className={s.MoviePage}>Movie :{id}</div>
}
