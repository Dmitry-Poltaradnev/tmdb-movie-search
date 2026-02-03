import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div>
      <p>404: Page not found</p>
      <Link to={'/'}>Go to main page</Link>
    </div>
  )
}
