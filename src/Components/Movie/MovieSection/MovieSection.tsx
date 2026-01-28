import { MovieCard } from '../MovieCard/MovieCard.tsx'
import s from './movieSection.module.css'
import { Link } from 'react-router-dom'

export type MovieSectionPropsType = {
  movies: any
  title: string
  category: string
  fullSection: boolean
}

export const MovieSection = ({ title, movies, category, fullSection }: MovieSectionPropsType) => {
  return (
    <section className={s.movieSection}>
      <h3>Category : {title}</h3>
      <div className={s.movieCardsWrapper}>
        {movies?.results?.map((item: any, index: number) => {
          if (!fullSection) {
            if (index < 6) {
              return <MovieCard key={item.id} movie={item} />
            }
          } else {
            return <MovieCard key={item.id} movie={item} />
          }
        })}
        {!fullSection ? <Link to={`/movie/category/${category}`}>View More</Link> : null}
      </div>
    </section>
  )
}
