import { Logo } from '../../../assets/icons/Logo.tsx'
import s from './Header.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../../features/slices/theme/themeSlices.ts'
import type { RootState } from '../../../app/store.ts'
import { Button } from '../../ui/Button/Button.tsx'

export const Header = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

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
      <Button title={`Change Theme : ${theme}`} callBack={() => dispatch(toggleTheme())} />
    </div>
  )
}
