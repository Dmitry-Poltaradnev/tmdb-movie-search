import { Logo } from '../../../assets/icons/Logo.tsx'
import s from './Header.module.css'
import { Link } from 'react-router-dom'
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
      <Logo width={'160'} height={'60'} />
      <ul className={s.menuList}>
        {menu.map((item) => (
          <li className={theme === 'light' ? s.menuItemLight : s.menuItemDark} key={item.title}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div onClick={handleToggleTheme} className={s.toggleThemeWrap}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </div>
    </div>
  )
}
