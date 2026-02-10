import s from './FilterMoviesPage.module.css'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { useGetFilteredMoviesQuery, useGetGenresMoviesQuery } from '../../../../api/tmdbApi.ts'
import type { GenreMovie } from '../../../../types/types.ts'
import { useState } from 'react'
import { RangeSlider } from './inputRating/InputRating.tsx'
import * as React from 'react'

export const FilterMoviesPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<GenreMovie[]>([])

  const [voteAverage, setVoteAverage] = React.useState<number[]>([0, 100])

  console.log(voteAverage)

  const resetFilter = () => {
    console.log('resetFilter')
  }

  const { data } = useGetGenresMoviesQuery()
  const { data: movies } = useGetFilteredMoviesQuery({
    genres: selectedGenres,
    vote_average: voteAverage,
  })
  // console.log(movies)

  const genres: GenreMovie[] = data?.genres

  const selectGenre = ({ genre }: { genre: GenreMovie }) => {
    setSelectedGenres((prev) => {
      const exist = prev.some((item) => item.id === genre.id)
      if (exist) {
        return prev.filter((item) => item.id !== genre.id)
      }
      return [...prev, genre]
    })
  }

  console.log(selectedGenres)
  return (
    <section className={s.filterMoviesPage}>
      <h3>Filtered Movies</h3>
      <div className={s.contentWrapper}>
        <div className={s.filterOptionsWrapper}>
          {genres?.length ? (
            <ul className={s.genresList}>
              {genres.map((genre: GenreMovie) => (
                <li key={genre.id} className={s.genresItem}>
                  <button
                    className={
                      selectedGenres.some((item) => item.id === genre.id)
                        ? s.activeGenre
                        : s.nonActiveGenre
                    }
                    onClick={() => selectGenre({ genre: genre })}
                  >
                    {genre.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>We don't have genres options</div>
          )}
          <RangeSlider value={voteAverage} onChange={setVoteAverage} />
          <button onClick={resetFilter}>Reset Filters</button>
        </div>
        {movies ? <MovieSection fullSection={true} movies={movies} /> : <div>No matches</div>}
      </div>
    </section>
  )
}
