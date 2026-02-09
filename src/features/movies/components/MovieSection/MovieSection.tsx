import { MovieCard } from '../MovieCard/MovieCard.tsx'
import s from './MovieSection.module.css'
import { Link } from 'react-router-dom'
import type { CategoryType } from '../../pages/MovieCategoryPage/MovieCategoryPage.tsx'
import type { MovieType } from '../../../favorites/favoritesSlices.ts'

type Dates = {
  maximum: string
  minimum: string
}

export type MoviesTypes = {
  dates: Dates
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}

export type MovieSectionPropsType = {
  movies: MoviesTypes
  title?: string
  category?: CategoryType
  fullSection: boolean
}

export const MovieSection = ({ title, movies, category, fullSection }: MovieSectionPropsType) => {
  return (
    <section className={s.movieSection}>
      {category ? <h3>Category : {title}</h3> : null}
      <div className={s.movieCardsWrapper}>
        {movies?.results?.map((item: MovieType, index: number) => {
          if (!fullSection) {
            if (index < 6) {
              return <MovieCard key={item.id} movie={item} isFavorite={false} />
            }
          } else {
            return <MovieCard key={item.id} movie={item} isFavorite={false} />
          }
        })}
        {!fullSection ? <Link to={`/movie/category/${category}`}>View More</Link> : null}
      </div>
    </section>
  )
}
