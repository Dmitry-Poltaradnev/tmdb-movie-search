import { MovieSection } from '../Movie/MovieSection.tsx'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../api/tmdbApi.ts'

export const Main = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery()
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery()

  return (
    <>
      <MovieSection title={'Popular Movie'} category={'popular'} movies={popularMovies} />
      <MovieSection title={'Upcoming Movie'} category={'upcoming'} movies={upcomingMovies} />
      <MovieSection title={'Now Playing Movie'} category={'nowPlaying'} movies={NowPlayingMovies} />
    </>
  )
}
