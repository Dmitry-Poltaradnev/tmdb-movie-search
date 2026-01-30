import s from './MovieCard.module.css'
import { useNavigate } from 'react-router-dom'

type MovieCardPropsType = {
  movie: any
}

export const MovieCard = ({ movie }: MovieCardPropsType) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }
  return (
    <div className={s.movieCard}>
      <div onClick={handleClick}>
        <img
          className={s.movieImg}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt="movieImg"
        />
        <p>Title : {movie.title}</p>
        <p>Rate : {movie.vote_average}</p>
      </div>
      <button>Add to my favorites</button>
    </div>
  )
}
