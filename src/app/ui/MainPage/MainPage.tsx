import { MovieSection } from '@/MovieSection/MovieSection.tsx'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/api/tmdbApi.ts'
import { WelcomeSection } from '@/WelcomeSection/WelcomeSection.tsx'
import { useRef } from 'react'
import { WelcomeSectionSkeleton } from '@/common/skeletons/WelcomeSectionSkeleton/WelcomeSectionSkeleton.tsx'

export const MainPage = () => {
  const popularMovies = useGetPopularMoviesQuery()
  const upcomingMovies = useGetUpcomingMoviesQuery()
  const nowPlayingMovies = useGetNowPlayingMoviesQuery()
  const topRatedMovies = useGetTopRatedMoviesQuery()

  const { data, isLoading } = popularMovies

  const randomPosterRef = useRef<number | null>(null)

  if (randomPosterRef.current === null && data?.results?.length) {
    randomPosterRef.current = Math.floor(Math.random() * data.results.length)
  }

  const randomPosterIndex = randomPosterRef.current ?? 0

  const backdropPath = data?.results?.[randomPosterIndex]?.backdrop_path ?? ''

  return (
    <>
      {isLoading || !data ? (
        <WelcomeSectionSkeleton />
      ) : (
        <WelcomeSection picture={`https://image.tmdb.org/t/p/w1280${backdropPath}`} />
      )}
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
