import { Logo } from '../../assets/Logo.tsx'
import s from './header.module.css'
import { Link } from 'react-router-dom'

const menu = [
  { title: 'Main', path: '/' },
  { title: 'Category Movies', path: '/movie/category/popular' },
  // { title: 'Favorites', path: `/account/${id}/favorite/movies` },
  // { title: 'Filtered Movies', path: '' },
  { title: 'Search', path: '/search/movie' },
]

export const Header = () => {
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
