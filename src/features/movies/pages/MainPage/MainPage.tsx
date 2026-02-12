import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import { WelcomeSection } from '../../components/WelcomeSection/WelcomeSection.tsx'
import { useRef } from 'react'

export const MainPage = () => {
  const popularMovies = useGetPopularMoviesQuery()
  const upcomingMovies = useGetUpcomingMoviesQuery()
  const nowPlayingMovies = useGetNowPlayingMoviesQuery()
  const topRatedMovies = useGetTopRatedMoviesQuery()

  const randomPosterRef = useRef<number | null>(null)

  if (randomPosterRef.current === null && popularMovies?.data?.results?.length) {
    randomPosterRef.current = Math.floor(Math.random() * popularMovies?.data.results.length)
  }

  // if (!popularMovies || !upcomingMovies || !nowPlayingMovies || !topRatedMovies) {
  //   return <p>Loading...</p>
  // }

  const randomPoster = randomPosterRef.current ?? 0

  return (
    <>
      <WelcomeSection
        picture={
          randomPoster
            ? `https://image.tmdb.org/t/p/w500${popularMovies?.data?.results[randomPoster]?.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${popularMovies?.data?.results[0]?.backdrop_path}`
        }
      />
      <MovieSection
        title={'Popular Movie'}
        category={'popular'}
        query={popularMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Top Rated Movie'}
        category={'top_rated'}
        query={topRatedMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Upcoming Movie'}
        category={'upcoming'}
        query={upcomingMovies}
        fullSection={false}
      />
      <MovieSection
        title={'Now Playing Movie'}
        category={'now_playing'}
        query={nowPlayingMovies}
        fullSection={false}
      />
    </>
  )
}
