import s from './SearchMoviePage.module.css'
import { SearchMovieBlock } from '../../../../Components/SearchMovieBlock/SearchMovieBlock.tsx'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { useGetMoviesByTitleQuery } from '../../../../api/tmdbApi.ts'
import { useSearchParams } from 'react-router-dom'

export const SearchMoviePage = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get('query') ?? ''

  const movies = useGetMoviesByTitleQuery(title, {
    skip: !title,
  })

  return (
    <section className={s.SearchMoviePage}>
      <h3>Search Movie Page</h3>
      <SearchMovieBlock />
      {movies ? (
        <MovieSection fullSection={true} query={movies} title={'All Movies with name...'} />
      ) : (
        <div>Try to search movie</div>
      )}
    </section>
  )
}
