import s from './SearchMoviePage.module.css'
import { SearchMovieBlock } from '../../../../Components/SearchMovieBlock/SearchMovieBlock.tsx'

export const SearchMoviePage = () => {
  return (
    <section className={s.SearchMoviePage}>
      <h3>Search Movie Page</h3>
      <SearchMovieBlock />
    </section>
  )
}
