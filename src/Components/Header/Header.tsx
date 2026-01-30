import { Logo } from '../../assets/Logo.tsx'
import s from './Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  const menu = [
    { title: 'Main', path: '/' },
    { title: 'Category movies', path: '/movie/category/popular' },
    { title: 'Filtered movies', path: '/filtered/movies' },
    { title: 'Search', path: '/search/movie' },
    { title: 'Favorites', path: '/favorite/movies' },
  ]

  return (
    <div className={s.header}>
      <Logo />
      <ul>
        {menu.map((item) => (
          <li key={item.title}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <button>Change Theme</button>
    </div>
  )
}
