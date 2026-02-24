import s from './SearchMoviePage.module.css'
import { SearchMovieBlock } from '../../../../Components/SearchMovieBlock/SearchMovieBlock.tsx'
import { MovieSection } from '../../components/MovieSection/MovieSection.tsx'
import { useGetMoviesByTitleQuery } from '../../../../api/tmdbApi.ts'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PaginationButtons from '../../../../Components/ui/Pagination/Pagination.tsx'

export const SearchMoviePage = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get('query') ?? ''
  const [page, setPage] = useState(1)

  const movies = useGetMoviesByTitleQuery(
    { title, page },
    {
      skip: !title,
    }
  )

  useEffect(() => {
    setPage(1)
  }, [title])

  const totalPages = Math.min(movies?.data?.total_pages ?? 1, 500)

  return (
    <section className={s.searchMoviePage}>
      <SearchMovieBlock />
      {title && movies.data?.results.length !== 0 ? (
        <div>
          <MovieSection fullSection={true} query={movies} />
          {totalPages > 1 && (
            <PaginationButtons page={page} onChange={setPage} count={totalPages} />
          )}
        </div>
      ) : title.trim().length > 0 && movies.data?.results.length === 0 ? (
        <p className={s.description}>No match for the query '{title}'</p>
      ) : (
        <p className={s.description}>Enter movie title</p>
      )}
    </section>
  )
}
