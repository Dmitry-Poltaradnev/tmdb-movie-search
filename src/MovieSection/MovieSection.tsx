import { MovieCard } from '../MovieCard/MovieCard.tsx'
import s from './MovieSection.module.css'
import { Link } from 'react-router-dom'
import type { CategoryType } from '@/features/movieCategory/ui/MovieCategoryPage.tsx'
import { MoviesCardSkeleton } from '@/common/skeletons/MovierCardSkeleton/MoviesCardSkeleton.tsx'
import type { MoviesTypes, MovieTypes } from '@/api/schema/movies.schema.ts'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store.ts'

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

  const theme = useSelector((state: RootState) => state.theme.theme)
  const favoritesMovies = useSelector((state: RootState) => state.favoriteMovies)

  const showSkeleton = isLoading || isFetching || !data

  return (
    <section className={s.movieSection}>
      {category ? <p className={s.categoryTitle}>{title}</p> : null}

      <div className={s.movieCardsWrapper}>
        {showSkeleton
          ? [...Array(6)].map((_, i) => <MoviesCardSkeleton key={i} />)
          : data.results.map((item: MovieTypes, index: number) => {
              if (!fullSection) {
                if (index < 6) {
                  return <MovieCard key={item.id} movie={item} favoritesMovies={favoritesMovies} />
                }
              } else {
                return <MovieCard key={item.id} movie={item} favoritesMovies={favoritesMovies} />
              }
            })}
      </div>
      {!fullSection && !showSkeleton && (
        <div className={s.viewBtnWrap}>
          <Link
            className={`${s.viewBtn} ${theme === 'dark' ? s.viewBtnDark : s.viewBtnLight}`}
            to={`/movie/category/${category}`}
          >
            View More
          </Link>
        </div>
      )}
    </section>
  )
}
