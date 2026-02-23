import { SearchMovieBlock } from '../../../../Components/SearchMovieBlock/SearchMovieBlock.tsx'
import s from './WelcomeSection.module.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../app/store.ts'

type WelcomeSectionProps = {
  picture?: string
}

export const WelcomeSection = ({ picture }: WelcomeSectionProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  return (
    <div
      className={s.welcomeSection}
      style={{ backgroundImage: picture ? `url(${picture})` : undefined }}
    >
      <p className={`${s.welcomeSectionTitle} ${theme === 'dark' ? s.darkTitle : s.lightTitle}`}>
        Welcome to the movie search engine
      </p>
      <SearchMovieBlock />
    </div>
  )
}
