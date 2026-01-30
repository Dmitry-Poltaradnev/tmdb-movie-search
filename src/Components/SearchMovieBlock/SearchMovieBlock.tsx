import s from './SearchMovieBlock.module.css'

export const SearchMovieBlock = () => {
  return (
    <div className={s.searchMovieBlock}>
      <input type="text" placeholder="Search Movie" />
      <button>Search</button>
    </div>
  )
}
