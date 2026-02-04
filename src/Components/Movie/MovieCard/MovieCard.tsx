import s from './MovieCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  addMovie,
  type MovieType,
  removeMovie,
} from '../../../features/favorites/favoritesSlices.ts'
import { store } from '../../../redux/store.ts'

type MovieCardPropsType = {
  movie: MovieType
  isFavorite: boolean
}

console.log(store.getState())

export const MovieCard = ({ movie, isFavorite }: MovieCardPropsType) => {
  const dispatch = useDispatch()

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
      {isFavorite ? (
        <button onClick={() => dispatch(removeMovie(movie))}>Remove from favorites</button>
      ) : (
        <button onClick={() => dispatch(addMovie(movie))}>Add to favorites</button>
      )}
    </div>
  )
}
