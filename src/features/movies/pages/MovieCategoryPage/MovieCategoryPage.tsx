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

export type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

export const MovieCategoryPage = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const { category } = useParams<{ category: CategoryType }>()

  const popularQuery = useGetPopularMoviesQuery()
  const upcomingQuery = useGetUpcomingMoviesQuery()
  const nowPlayingQuery = useGetNowPlayingMoviesQuery()
  const topRatedQuery = useGetTopRatedMoviesQuery()

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
    </section>
  )
}
