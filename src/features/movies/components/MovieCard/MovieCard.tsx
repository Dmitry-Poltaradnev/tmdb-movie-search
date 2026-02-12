import s from './MovieCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMovie, type MovieType, removeMovie } from '../../../favorites/favoritesSlices.ts'
import { store } from '../../../../app/store.ts'
import { Button } from '../../../../Components/ui/Button/Button.tsx'

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
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : 'https://placehold.co/160x160'
          }
          alt="movieImg"
        />
        <p>Title : {movie.title}</p>
        <p>Rate : {movie.vote_average}</p>
      </div>
      {isFavorite ? (
        <Button title={'Remove from favorites'} callBack={() => dispatch(removeMovie(movie))} />
      ) : (
        <Button title={'Add to favorites'} callBack={() => dispatch(addMovie(movie))} />
      )}
    </div>
  )
}
