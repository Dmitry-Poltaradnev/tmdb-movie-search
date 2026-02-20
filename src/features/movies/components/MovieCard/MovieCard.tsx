import s from './MovieCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMovie, removeMovie } from '../../../slices/favorites/favoritesSlices.ts'
import { store } from '../../../../app/store.ts'
import { Button } from '../../../../Components/ui/Button/Button.tsx'
import type { MovieTypes } from '../../../../api/schema/movies.schema.ts'

type MovieCardPropsType = {
  movie: MovieTypes
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
              : 'https://placehold.co/160x160?text=No+Photo'
          }
          alt="movieImg"
        />
      </div>
      <div className={s.cardContent}>
        <p className={s.movieTitle} onClick={handleClick}>
          {movie.title}
        </p>
        <p>Rate: {movie.vote_average.toFixed(1)}</p>
        {isFavorite ? (
          <Button
            classNames={s.cardBtn}
            title={'Remove from favorites'}
            callBack={() => dispatch(removeMovie(movie))}
          />
        ) : (
          <Button
            classNames={s.cardBtn}
            title={'Add to favorites'}
            callBack={() => dispatch(addMovie(movie))}
          />
        )}
      </div>
    </div>
  )
}
