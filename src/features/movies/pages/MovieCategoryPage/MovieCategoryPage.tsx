import s from './MovieCategoryPage.module.css'
import d from '../../../../Components/layout/Header/Header.module.css'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../app/store.ts'
import PaginationButtons from '../../../../Components/ui/Pagination/Pagination.tsx'
import { useState } from 'react'

export type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

export const MovieCategoryPage = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const { category } = useParams<{ category: CategoryType }>()

  const [page, setPage] = useState(1)

  const popularQuery = useGetPopularMoviesQuery(page)
  const upcomingQuery = useGetUpcomingMoviesQuery(page)
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(page)
  const topRatedQuery = useGetTopRatedMoviesQuery(page)

  const categories = {
    popular: {
      title: 'Popular',
      query: popularQuery,
    },
    upcoming: {
      title: 'Upcoming',
      query: upcomingQuery,
    },
    now_playing: {
      title: 'Now Playing',
      query: nowPlayingQuery,
    },
    top_rated: {
      title: 'Top Rated',
      query: topRatedQuery,
    },
  }

  const currentCategory =
    category && categories[category] ? categories[category] : categories.popular

  console.log(currentCategory.query.data)

  const totalPages = Math.min(currentCategory?.query?.data?.total_pages ?? 1, 500)

  return (
    <section className={s.movieCategoryPage}>
      <ul className={s.categoryList}>
        {Object.entries(categories).map(([key, value]) => (
          <li className={d.menuItem} key={key}>
            <NavLink
              className={({ isActive }) =>
                `
          ${theme === 'light' ? d.menuItemLight : d.menuItemDark}
          ${isActive ? d.menuItemActive : ''}
          `
              }
              to={`/movie/category/${key}`}
            >
              {value.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <MovieSection
        query={currentCategory.query}
        category={category}
        title={currentCategory.title}
        fullSection={true}
      />
      <div className={s.paginationWrapper}>
        {!currentCategory.query ? (
          <div>...Loading</div>
        ) : (
          <PaginationButtons count={totalPages} page={page} onChange={setPage} />
        )}
      </div>
    </section>
  )
}
