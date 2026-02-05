import App from '../app/App.tsx'
import { MainPage } from '../features/movies/pages/MainPage/MainPage.tsx'
import { MoviePage } from '../features/movies/components/MoviePage/MoviePage.tsx'
import { Route, Routes } from 'react-router-dom'
import { MovieCategoryPage } from '../features/movies/pages/MovieCategoryPage/MovieCategoryPage.tsx'
import { FavoriteMoviesPage } from '../features/movies/pages/FavoriteMoviesPage/FavoriteMoviesPage.tsx'
import { SearchMoviePage } from '../features/movies/pages/SearchMoviePage/SearchMoviePage.tsx'
import { FilterMoviesPage } from '../features/movies/pages/FilterMoviesPage/FilterMoviesPage.tsx'
import { NotFoundPage } from '../features/movies/pages/NotFoundPage/NotFoundPage.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/movie/category/:category" element={<MovieCategoryPage />} />
        <Route path="/favorite/movies" element={<FavoriteMoviesPage />} />
        <Route path="/search/movie" element={<SearchMoviePage />} />
        <Route path="/filtered/movies" element={<FilterMoviesPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
