import s from './MovieCategoryPage.module.css'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { Link, useParams } from 'react-router-dom'

export type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

export const MovieCategoryPage = () => {
  const { category } = useParams<{ category: CategoryType }>()

  const popularQuery = useGetPopularMoviesQuery()
  const upcomingQuery = useGetUpcomingMoviesQuery()
  const nowPlayingQuery = useGetNowPlayingMoviesQuery()
  const topRatedQuery = useGetTopRatedMoviesQuery()

  const categories = {
    popular: {
      title: 'Popular Movies',
      query: popularQuery,
    },
    upcoming: {
      title: 'Upcoming Movies',
      query: upcomingQuery,
    },
    now_playing: {
      title: 'Now Playing Movies',
      query: nowPlayingQuery,
    },
    top_rated: {
      title: 'Top Rated Movies',
      query: topRatedQuery,
    },
  }

  const currentCategory =
    category && categories[category] ? categories[category] : categories.popular

  return (
    <section className={s.MovieCategoryPage}>
      <h3>Movie Category page: {category ?? 'popular'}</h3>

      <ul>
        {Object.entries(categories).map(([key, value]) => (
          <li key={key}>
            <Link to={`/movie/category/${key}`}>{value.title}</Link>
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
