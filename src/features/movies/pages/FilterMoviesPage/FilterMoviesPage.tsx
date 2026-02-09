import s from './FilterMoviesPage.module.css'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { useGetGenresMoviesQuery } from '../../../../api/tmdbApi.ts'
import type { GenreMovie } from '../../../../types/types.ts'
import { useState } from 'react'

export const FilterMoviesPage = () => {
  const movies = {}

  const [selectedGenres, setSelectedGenres] = useState<GenreMovie[]>([])

  const { data } = useGetGenresMoviesQuery()

  const genres: GenreMovie[] = data?.genres

  const selectGenre = (genre: GenreMovie) => {
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
      {genres?.length ? (
        <ul className={s.genresList}>
          {genres.map((genre: GenreMovie) => (
            <li key={genre.id} className={s.genresItem}>
              <button onClick={() => selectGenre(genre)}>{genre.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>We don't have genres options</div>
      )}

      {movies ? <MovieSection fullSection={true} movies={movies} /> : <div>No matches</div>}
    </section>
  )
}
