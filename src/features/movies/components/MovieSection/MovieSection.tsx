import { MovieCard } from '../MovieCard/MovieCard.tsx'
import s from './MovieSection.module.css'
import { Link } from 'react-router-dom'
import type { CategoryType } from '../../pages/MovieCategoryPage/MovieCategoryPage.tsx'
import { MoviesCardSkeleton } from '../../../../Components/ui/Skeletons/MovierCardSkeleton/MoviesCardSkeleton.tsx'
import type { MoviesTypes, MovieTypes } from '../../../../api/schema/movies.schema.ts'

type MovieSectionPropsType = {
  query: {
    data?: MoviesTypes
    isLoading: boolean
    isFetching: boolean
  }
  title?: string
  category?: CategoryType
  fullSection: boolean
}

export const MovieSection = ({ query, title, category, fullSection }: MovieSectionPropsType) => {
  const { data, isLoading, isFetching } = query

  const showSkeleton = isLoading || isFetching || !data

  return (
    <section className={s.movieSection}>
      {category ? <h3>Category : {title}</h3> : null}

      <div className={s.movieCardsWrapper}>
        {showSkeleton
          ? [...Array(6)].map((_, i) => <MoviesCardSkeleton key={i} />)
          : data.results.map((item: MovieTypes, index: number) => {
              if (!fullSection) {
                if (index < 6) {
                  return <MovieCard key={item.id} movie={item} isFavorite={false} />
                }
              } else {
                return <MovieCard key={item.id} movie={item} isFavorite={false} />
              }
            })}

        {!fullSection && !showSkeleton && <Link to={`/movie/category/${category}`}>View More</Link>}
      </div>
    </section>
  )
}
