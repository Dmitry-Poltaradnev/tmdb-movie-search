import { MovieSection } from '../Movie/MovieSection/MovieSection.tsx'
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

  const getRandomPoster = () => {
    if (!popularMovies?.results?.length) return 0
    return Math.floor(Math.random() * popularMovies.results.length)
  }

  const randomPoster = getRandomPoster()
  return (
    <>
      <WelcomeSection
        picture={`https://image.tmdb.org/t/p/w500${popularMovies?.results[randomPoster]?.backdrop_path}`}
      />
      <MovieSection
        title={'Popular Movie'}
        category={'popular'}
        movies={popularMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Top Rated Movie'}
        category={'top_rated'}
        movies={TopRatedMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Upcoming Movie'}
        category={'upcoming'}
        movies={upcomingMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Now Playing Movie'}
        category={'now_playing'}
        movies={NowPlayingMovies}
        fullSection={false}
      />
    </>
  )
}
