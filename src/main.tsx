import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/routes.tsx'
import './app/styles/reset.css'

const params = new URLSearchParams(window.location.search)
const redirect = params.get('redirect')

if (redirect) {
  window.history.replaceState(null, '', redirect)
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/*<BrowserRouter basename="/tmdb-movie-search/"> for gh-pages */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
