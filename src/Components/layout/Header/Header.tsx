import { Logo } from '../../../assets/icons/Logo.tsx'
import s from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../../features/slices/theme/themeSlices.ts'
import type { RootState } from '../../../app/store.ts'
import { MoonIcon } from '../../../assets/icons/MoonIcon.tsx'
import { SunIcon } from '../../../assets/icons/SunIcon.tsx'

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

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className={s.header}>
      <Link to={menu[0].path}>
        <Logo width={'160'} height={'60'} />
      </Link>
      <ul className={s.menuList}>
        {menu.map((item) => (
          <li className={s.menuItem} key={item.title}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `
          ${theme === 'light' ? s.menuItemLight : s.menuItemDark}
          ${isActive ? s.menuItemActive : ''}
          `
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div onClick={handleToggleTheme} className={s.toggleThemeWrap}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </div>
    </div>
  )
}
