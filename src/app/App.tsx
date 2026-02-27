import './App.css'
import { Header } from '@/common/layout/Header/Header.tsx'
import { Footer } from '@/common/layout/Footer/Footer.tsx'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { Theme } from '@/slices/theme/themeSlices.ts'
import { useEffect } from 'react'
import type { RootState } from './store.ts'
import { LinearProgress } from '@mui/material'
import { ErrorSnackBar } from '@/common/components/ErrorSnackBar/ErrorSnackBar.tsx'

function App() {
  const theme: Theme = useSelector((state: RootState) => state.theme.theme)

  const isFetching = useSelector((state: RootState) =>
    Object.values(state.tmdbApi.queries).some((query) => query?.status === 'pending')
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <>
      {isFetching && <LinearProgress sx={{ height: '15px' }} className="globalProgress" />}

      <div className="layout">
        <Header />

        <main className="content">
          <Outlet />
        </main>

        <Footer />
        <ErrorSnackBar />
      </div>
    </>
  )
}

export default App
