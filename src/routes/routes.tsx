import App from '../App.tsx'
import { Main } from '../Components/Main/Main.tsx'
import { MoviePage } from '../Components/Movie/MoviePage/MoviePage.tsx'
import { Route, Routes } from 'react-router-dom'
import { MovieCategoryPage } from '../Components/pages/MovieCategoryPage/MovieCategoryPage.tsx'
import { FavoriteMoviesPage } from '../Components/pages/FavoriteMoviesPage/FavoriteMoviesPage.tsx'
import { SearchMoviePage } from '../Components/pages/SearchMoviePage/SearchMoviePage.tsx'
import { FilterMoviesPage } from '../Components/pages/FilterMoviesPage/FilterMoviesPage.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="movie/category/:category" element={<MovieCategoryPage />} />
        <Route path="favorite/movies" element={<FavoriteMoviesPage />} />
        <Route path="search/movie" element={<SearchMoviePage />} />
        <Route path="filtered/movies" element={<FilterMoviesPage />} />
      </Route>
    </Routes>
  )
}
