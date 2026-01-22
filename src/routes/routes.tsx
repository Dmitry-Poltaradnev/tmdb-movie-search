import App from '../App.tsx'
import { Main } from '../Components/Main/Main.tsx'
import { MoviePage } from '../Components/Movie/MoviePage.tsx'
import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="movie/:id" element={<MoviePage />} />
      </Route>
    </Routes>
  )
}
