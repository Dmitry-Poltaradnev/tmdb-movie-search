import { SearchMovieBlock } from '../SearchMovieBlock/SearchMovieBlock.tsx'
import s from './WelcomeSection.module.css'

type WelcomeSectionProps = {
  picture?: string
}

export const WelcomeSection = ({ picture }: WelcomeSectionProps) => {
  return (
    <div
      className={s.welcomeSection}
      style={{ backgroundImage: picture ? `url(${picture})` : undefined }}
    >
      <h2>Welcome to the movie search engine</h2>
      <SearchMovieBlock />
    </div>
  )
}
