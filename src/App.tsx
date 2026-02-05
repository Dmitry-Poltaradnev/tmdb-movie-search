import './App.css'
import { Header } from './Components/Header/Header.tsx'
import { Footer } from './Components/Footer/Footer.tsx'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { Theme } from './features/theme/themeSlices.ts'
import { useEffect } from 'react'
import type { RootState } from './redux/store.ts'

function App() {
  const theme: Theme = useSelector((state: RootState) => state.theme.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
