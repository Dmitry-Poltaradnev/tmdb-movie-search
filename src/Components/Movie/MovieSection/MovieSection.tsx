import { MovieCard } from '../MovieCard/MovieCard.tsx'
import s from './movieSection.module.css'

type MovieSectionPropsType = {
  movies: any
  title: string
  category: 'popular' | 'upcoming' | 'nowPlaying' | 'topRated'
}

export const MovieSection = ({ title, movies }: MovieSectionPropsType) => {
  return (
    <section className={s.movieSection}>
      <h3>Category : {title}</h3>
      <div className={s.movieCardsWrapper}>
        {movies?.results.map((item: any, index: number) => {
          if (index < 6) {
            return <MovieCard key={item.id} movie={item} />
          }
          return null
        })}
      </div>
      <button>View More</button>
    </section>
  )
}
