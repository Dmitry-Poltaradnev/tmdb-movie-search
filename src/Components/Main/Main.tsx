import { MovieSection } from '../Movie/MovieSection/MovieSection.tsx'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../api/tmdbApi.ts'
import { WelcomeSection } from '../WelcomeSection/WelcomeSection.tsx'
import { useRef } from 'react'

export const Main = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery()
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: nowPlayingMovies } = useGetNowPlayingMoviesQuery()
  const { data: topRatedMovies } = useGetTopRatedMoviesQuery()

  const randomPosterRef = useRef<number | null>(null)

  if (randomPosterRef.current === null && popularMovies?.results?.length) {
    randomPosterRef.current = Math.floor(Math.random() * popularMovies.results.length)
  }

  if (!popularMovies || !upcomingMovies || !nowPlayingMovies || !topRatedMovies) {
    return <p>Loading...</p>
  }

  const randomPoster = randomPosterRef.current ?? 0
  return (
    <>
      <WelcomeSection
        picture={
          randomPoster
            ? `https://image.tmdb.org/t/p/w500${popularMovies?.results[randomPoster]?.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${popularMovies?.results[0]?.backdrop_path}`
        }
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
        movies={topRatedMovies}
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
        movies={nowPlayingMovies}
        fullSection={false}
      />
    </>
  )
}
