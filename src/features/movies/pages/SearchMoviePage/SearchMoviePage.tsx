import s from './SearchMoviePage.module.css'
import { SearchMovieBlock } from '../../../../Components/SearchMovieBlock/SearchMovieBlock.tsx'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { useGetMoviesByTitleQuery } from '../../../../api/tmdbApi.ts'
import { useSearchParams } from 'react-router-dom'

export const SearchMoviePage = () => {
  // ==================
  const [searchParams] = useSearchParams()
  const title = searchParams.get('query') ?? ''

  const { data: movies, isFetching } = useGetMoviesByTitleQuery(title, {
    skip: !title,
  })
  console.log(movies)
  if (isFetching) return <div>Loading...</div>
  if (!movies) return null
  // ==================

  return (
    <section className={s.SearchMoviePage}>
      <h3>Search Movie Page</h3>
      <SearchMovieBlock />
      <MovieSection fullSection={true} movies={movies} title={'All Movies with name...'} />
    </section>
  )
}
