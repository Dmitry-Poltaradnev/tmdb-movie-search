import { useParams } from 'react-router-dom'
import s from './MoviePage.module.css'
import { useGetMovieDetailsQuery } from '../../../api/tmdbApi.ts'

export const MoviePage = () => {
  const { id } = useParams()

  const { data } = useGetMovieDetailsQuery(id)
  const { backdrop_path, budget, genres, overview, runtime, title, vote_average } = data || {}

  if (!data) return <div>Loading...</div>

  const finalBudget = (budget: number) => {
    return budget.toString().length > 6 ? budget.toString().slice(0, -6) : budget
  }

  return (
    <div className={s.moviePage}>
      <p> MovieID :{id}</p>
      <h4>Title: {title}</h4>
      <ul className={s.genresList}>
        Genres :
        {genres?.map((item: any) => (
          <li key={item.id}> {item.name} </li>
        ))}
      </ul>
      <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="moviePoster" />
      <p>Description: {overview}</p>
      <p>Movie duration : {runtime} m</p>
      <p>Rating: {vote_average}</p>
      {Number(finalBudget(budget)) !== 0 ? <p>Budget: {finalBudget(budget)}M USD</p> : null}
    </div>
  )
}
