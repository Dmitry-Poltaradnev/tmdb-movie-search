import { Logo } from '../../assets/Logo.tsx'
import s from './header.module.css'

const headerMenuMass = ['Main', 'Category Movies', 'Filtered Movies', 'Search', 'Favorites']

export const Header = () => {
  return (
    <div className={s.header}>
      <Logo />
      <ul>
        {headerMenuMass.map((item) => (
          <li>
            <a href="">{item}</a>
          </li>
        ))}
      </ul>
      <button>Change Theme</button>
    </div>
  )
}
