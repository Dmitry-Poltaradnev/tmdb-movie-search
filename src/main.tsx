import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/tmdb-movie-search">
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
