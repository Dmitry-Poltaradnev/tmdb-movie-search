import s from './movieCategoryPage.module.css'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../api/tmdbApi.ts'
import { MovieSection } from '../Movie/MovieSection/MovieSection.tsx'
import { Link, useParams } from 'react-router-dom'

export const MovieCategoryPage = () => {
  const { category } = useParams()

  const { data: popularMovies } = useGetPopularMoviesQuery()
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery()
  const { data: TopRatedMovies } = useGetTopRatedMoviesQuery()

  const categoryMassBtn = ['popular', 'upcoming', 'now_playing', 'top_rated']

  const Btns = (
    <ul>
      {categoryMassBtn.map((btn) => (
        <li>
          <Link to={`/movie/category/${btn}`}>{btn}</Link>
        </li>
      ))}
    </ul>
  )

  const getCategory = (category: any) => {
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
  const categoryVal = getCategory(category)

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
