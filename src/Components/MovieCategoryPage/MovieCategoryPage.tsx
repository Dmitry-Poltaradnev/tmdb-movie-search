import s from './movieCategoryPage.module.css'
import {
  // useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  // useGetUpcomingMoviesQuery,
} from '../../api/tmdbApi.ts'
import { MovieSection } from '../Movie/MovieSection/MovieSection.tsx'

export const MovieCategoryPage = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery()
  // const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  // const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery()

  return (
    <section className={s.MovieCategoryPage}>
      <h3>MovieCategoryPage</h3>
      <MovieSection movies={popularMovies} category={'popular'} title={'Popular Movies'} />
    </section>
  )
}
