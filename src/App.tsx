import './App.css'
import { Header } from './Components/Header/Header.tsx'
import { Footer } from './Components/Footer/Footer.tsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
