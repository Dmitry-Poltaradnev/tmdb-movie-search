import s from './MovieCategoryPage.module.css'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../../api/tmdbApi.ts'
import { MovieSection } from '../../Movie/MovieSection/MovieSection.tsx'
import { Link, useParams } from 'react-router-dom'

export type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

export const MovieCategoryPage = () => {
  const { category } = useParams<{ category: CategoryType }>()

  const { data: popularMovies } = useGetPopularMoviesQuery()
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery()
  const { data: TopRatedMovies } = useGetTopRatedMoviesQuery()

  const categoryMassBtn = [
    { title: 'Popular', category: 'popular' },
    { title: 'Upcoming', category: 'upcoming' },
    { title: 'Now Playing', category: 'now_playing' },
    { title: 'Top Rated', category: 'top_rated' },
  ]

  const Btns = (
    <ul>
      {categoryMassBtn.map((btn) => (
        <li key={btn.category}>
          <Link to={`/movie/category/${btn.category}`}>{btn.title}</Link>
        </li>
      ))}
    </ul>
  )

  const getCategory = (category: CategoryType) => {
    switch (category) {
      case 'popular':
        return { title: 'Popular Movies', movies: popularMovies }
      case 'upcoming':
        return { title: 'Upcoming Movies', movies: upcomingMovies }
      case 'now_playing':
        return { title: 'Now Playing Movies', movies: NowPlayingMovies }
      case 'top_rated':
        return { title: 'Top Rated', movies: TopRatedMovies }
      default:
        return { title: 'Popular Movies', movies: popularMovies }
    }
  }

  const categoryVal = getCategory(category as CategoryType)

  return (
    <section className={s.MovieCategoryPage}>
      <h3>Movie Category page : {category}</h3>
      {Btns}
      <MovieSection
        movies={categoryVal.movies}
        category={category}
        title={categoryVal.title}
        fullSection={true}
      />
    </section>
  )
}
