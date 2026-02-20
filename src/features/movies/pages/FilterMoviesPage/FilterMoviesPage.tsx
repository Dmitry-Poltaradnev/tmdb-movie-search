import s from './FilterMoviesPage.module.css'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import {
  useGetFilteredMoviesQuery,
  useGetGenresMoviesQuery,
  useGetPopularMoviesQuery,
} from '../../../../api/tmdbApi.ts'
import type { SortValueType } from '../../../../types/types.ts'
import { useState } from 'react'
import { RangeSlider } from './inputRating/InputRating.tsx'
import { useDebounceRating } from './debounce/debounceRating.ts'
import { Button } from '../../../../Components/ui/Button/Button.tsx'
import DropDown from '../../components/DropDown/DropDown.tsx'
import type { GenreType } from '../../../../api/schema/genre.schema.ts'

const sortValues: SortValueType[] = [
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
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([])
  const [voteAverage, setVoteAverage] = useState<number[]>([0, 100])
  const [sort, setSort] = useState<SortValueType>(sortValues[0])

  console.log(selectedGenres)
  console.log(voteAverage)
  console.log(sort)

  const debouncedVoteAverage = useDebounceRating(voteAverage, 300)

  const isFiltered =
    selectedGenres.length > 0 ||
    voteAverage[0] !== 0 ||
    voteAverage[1] !== 100 ||
    sort.sortOption !== sortValues[0].sortOption

  const filteredQuery = useGetFilteredMoviesQuery(
    {
      genres: selectedGenres,
      vote_average: debouncedVoteAverage,
      sortValue: sort.sortOption,
    },
    { skip: !isFiltered }
  )

  const popularQuery = useGetPopularMoviesQuery(undefined, {
    skip: isFiltered,
  })

  const genresQuery = useGetGenresMoviesQuery()

  const moviesQuery = isFiltered ? filteredQuery : popularQuery

  const selectGenre = (genre: GenreType) => {
    setSelectedGenres((prev) => {
      const exists = prev.some((item) => item.id === genre.id)
      return exists ? prev.filter((item) => item.id !== genre.id) : [...prev, genre]
    })
  }

  const resetFilter = () => {
    setSelectedGenres([])
    setVoteAverage([0, 100])
    setSort(sortValues[0])
  }

  return (
    <section className={s.filterMoviesPage}>
      <div className={s.contentWrapper}>
        <div className={s.filterOptionsWrapper}>
          <DropDown values={sortValues} onChange={setSort} value={sort} />

          {genresQuery.data?.genres?.length ? (
            <ul className={s.genresList}>
              {genresQuery.data.genres.map((genre: GenreType) => (
                <li key={genre.id} className={s.genresItem}>
                  <Button
                    title={genre.name}
                    callBack={() => selectGenre(genre)}
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
            <div>Loading genres...</div>
          )}

          <RangeSlider value={voteAverage} onChange={setVoteAverage} />

          <Button title="Reset Filters" callBack={resetFilter} />
        </div>

        <MovieSection fullSection={true} query={moviesQuery} />
      </div>
    </section>
  )
}
