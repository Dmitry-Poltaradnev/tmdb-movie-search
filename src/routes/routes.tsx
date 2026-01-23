import { Main } from '../Components/Main/Main.tsx'
import { MoviePage } from '../Components/Movie/MoviePage/MoviePage.tsx'
import { Route, Routes } from 'react-router-dom'
import { MovieCategoryPage } from '../Components/MovieCategoryPage/MovieCategoryPage.tsx'
// import { FavoriteMoviesPage } from '../Components/FavoriteMoviesPage/FavoriteMoviesPage.tsx'
import App from '../App.tsx'
// import { SearchMoviePage } from '../Components/SearchMoviePage/SearchMoviePage.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="movie/popular" element={<MovieCategoryPage />} />
        {/*<Route path="account/:id/favorite/movies" element={<FavoriteMoviesPage />} />*/}
        {/*<Route path="search/movie" element={<SearchMoviePage />} />*/}
      </Route>
    </Routes>
  )
}
