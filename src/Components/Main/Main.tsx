import { MovieSection } from '../Movie/MovieSection.tsx'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../api/tmdbApi.ts'
import { WelcomeSection } from '../WelcomeSection/WelcomeSection.tsx'

export const Main = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery()
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: NowPlayingMovies } = useGetNowPlayingMoviesQuery()
  const { data: TopRatedMovies } = useGetTopRatedMoviesQuery()

  return (
    <>
      <WelcomeSection
        picture={`https://image.tmdb.org/t/p/w500${popularMovies?.results[0]?.poster_path}`}
      />
      <MovieSection title={'Popular Movie'} category={'popular'} movies={popularMovies} />
      <MovieSection title={'Top Rated Movie'} category={'topRated'} movies={TopRatedMovies} />
      <MovieSection title={'Upcoming Movie'} category={'upcoming'} movies={upcomingMovies} />
      <MovieSection title={'Now Playing Movie'} category={'nowPlaying'} movies={NowPlayingMovies} />
    </>
  )
}
