import s from './FilterMoviesPage.module.css'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import {
  useGetFilteredMoviesQuery,
  useGetGenresMoviesQuery,
  useGetPopularMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import type { GenreMovie, SortValueType } from '../../../../types/types.ts'
import { useState } from 'react'
import { RangeSlider } from './inputRating/InputRating.tsx'
import { useDebounceRating } from './debounce/debounceRating.ts'
import { Button } from '../../../../Components/ui/Button/Button.tsx'
import DropDown from '../../components/DropDown/DropDown.tsx'

const sortValues = [
  { sortOption: 'original_title.asc', title: 'Title A-Z' },
  { sortOption: 'original_title.desc', title: 'Title Z-A' },
  { sortOption: 'popularity.asc', title: 'Popularity from min to max' },
  { sortOption: 'popularity.desc', title: 'Popularity max to min' },
  { sortOption: 'primary_release_date.asc', title: 'Release date earlier' },
  { sortOption: 'primary_release_date.desc', title: 'Release date later' },
  { sortOption: 'vote_average.asc', title: 'Vote average min to max' },
  { sortOption: 'vote_average.desc', title: 'Vote average max to min' },
]

export const FilterMoviesPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<GenreMovie[]>([])

  const [voteAverage, setVoteAverage] = useState<number[]>([0, 100])

  const [sort, setSort] = useState<SortValueType>(sortValues[0])

  const resetFilter = () => {
    setSelectedGenres([])
    setVoteAverage([0, 100])
    setSort(sortValues[0])
  }
  const isFiltered =
    selectedGenres.length > 0 ||
    voteAverage[0] !== 0 ||
    voteAverage[1] !== 100 ||
    sort.sortOption !== sortValues[0].sortOption

  const debouncedVoteAverage = useDebounceRating(voteAverage, 200)

  const { data } = useGetGenresMoviesQuery()

  const { data: filteredMovies } = useGetFilteredMoviesQuery(
    {
      genres: selectedGenres,
      vote_average: debouncedVoteAverage,
      sortValue: sort.sortOption,
    },
    {
      skip: !isFiltered,
    }
  )

  const { data: popularMovies } = useGetPopularMoviesQuery(undefined, {
    skip: isFiltered,
  })

  const genres = data?.genres

  const selectGenre = ({ genre }: { genre: GenreMovie }) => {
    setSelectedGenres((prev) => {
      const exist = prev.some((item) => item.id === genre.id)
      if (exist) {
        return prev.filter((item) => item.id !== genre.id)
      }
      return [...prev, genre]
    })
  }
  const moviesToShow = isFiltered ? filteredMovies : popularMovies

  if (!moviesToShow) {
    return <div>Loading...</div>
  }

  return (
    <section className={s.filterMoviesPage}>
      <h3>Filtered Movies</h3>
      <div className={s.contentWrapper}>
        <div className={s.filterOptionsWrapper}>
          <DropDown values={sortValues} onChange={setSort} value={sort} />
          {genres?.length ? (
            <ul className={s.genresList}>
              {genres.map((genre: GenreMovie) => (
                <li key={genre.id} className={s.genresItem}>
                  <Button
                    title={genre.name}
                    callBack={() => selectGenre({ genre: genre })}
                    classNames={
                      selectedGenres.some((item) => item.id === genre.id)
                        ? s.activeGenre
                        : s.nonActiveGenre
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>We don't have genres options</div>
          )}
          <RangeSlider value={debouncedVoteAverage} onChange={setVoteAverage} />
          <Button title={'Reset Filters'} callBack={resetFilter} />
        </div>
        <MovieSection fullSection={true} movies={moviesToShow} />
      </div>
    </section>
  )
}
