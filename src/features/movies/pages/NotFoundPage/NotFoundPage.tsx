import { Link } from 'react-router-dom'
import s from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <div className={s.notFoundPageWrap}>
      <p className={s.notFoundTitle}>404: Page not found</p>
      <Link className={s.notFoundLink} to={'/'}>
        Go to main page
      </Link>
    </div>
  )
}
