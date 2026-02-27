import App from '../../app/App.tsx'
import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { MoviePage } from '@/MoviePage/MoviePage.tsx'
import { Route, Routes } from 'react-router-dom'
import { MovieCategoryPage } from '@/features/movieCategory/ui/MovieCategoryPage.tsx'
import { SearchMoviePage } from '@/features/searchMovie/ui/SearchMoviePage.tsx'
import { FilterMoviesPage } from '../../features/filterMovies/ui/FilterMoviesPage.tsx'
import { NotFoundPage } from '@/common/components/NotFoundPage/NotFoundPage.tsx'
import { FavoriteMoviesPage } from '@/features/favoriteMovies/ui/FavoriteMoviesPage.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="movie/category/:category" element={<MovieCategoryPage />} />
        <Route path="favorite/movies" element={<FavoriteMoviesPage />} />
        <Route path="search/movie" element={<SearchMoviePage />} />
        <Route path="filtered/movies" element={<FilterMoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
