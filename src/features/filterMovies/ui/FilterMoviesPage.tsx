import s from './FilterMoviesPage.module.css'
import { MovieSection } from '@/MovieSection/MovieSection.tsx'
import {
  useGetFilteredMoviesQuery,
  useGetGenresMoviesQuery,
  useGetPopularMoviesQuery,
} from '@/api/tmdbApi.ts'
import type { SortValueType } from '@/types/types.ts'
import { useEffect, useState } from 'react'
import { RangeSlider } from '@/features/filterMovies/inputRating/InputRating.tsx'
import { useDebounceRating } from '@/features/filterMovies/debounce/debounceRating.ts'
import DropDown from '@/features/filterMovies/DropDown/DropDown.tsx'
import type { GenreType } from '@/api/schema/genre.schema.ts'
import { Button } from '@/common/Button/Button.tsx'
import PaginationButtons from '@/common/components/Pagination/Pagination.tsx'

const sortValues: SortValueType[] = [
  { sortOption: 'popularity.desc', title: 'Popularity max to min' },
  { sortOption: 'popularity.asc', title: 'Popularity from min to max' },
  { sortOption: 'vote_average.desc', title: 'Vote average max to min' },
  { sortOption: 'vote_average.asc', title: 'Vote average min to max' },
  { sortOption: 'primary_release_date.desc', title: 'Release date later' },
  { sortOption: 'primary_release_date.asc', title: 'Release date earlier' },
  { sortOption: 'original_title.desc', title: 'Title Z-A' },
  { sortOption: 'original_title.asc', title: 'Title A-Z' },
]

export const FilterMoviesPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([])
  const [voteAverage, setVoteAverage] = useState<number[]>([0, 100])
  const [sort, setSort] = useState<SortValueType>(sortValues[0])
  const debouncedVoteAverage = useDebounceRating(voteAverage, 400)

  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [selectedGenres, debouncedVoteAverage, sort])

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
      page: page,
    },
    { skip: !isFiltered }
  )
  const popularQuery = useGetPopularMoviesQuery(page, {
    skip: isFiltered,
  })
  const moviesQuery = isFiltered ? filteredQuery : popularQuery
  const totalPages = Math.min(moviesQuery?.data?.total_pages ?? 1, 500)

  const genresQuery = useGetGenresMoviesQuery()

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
        <div className={s.movieOutputWrap}>
          <MovieSection fullSection={true} query={moviesQuery} />
          {totalPages > 1 && (
            <PaginationButtons page={page} onChange={setPage} count={totalPages} />
          )}
        </div>
      </div>
    </section>
  )
}
