import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store.ts'
import s from './Button.module.css'

type ButtonProps = {
  title: string
  callBack: () => void
  classNames?: string
  isDisabled?: boolean
}

export const Button = ({ title, callBack, classNames, isDisabled }: ButtonProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  return (
    <button
      disabled={isDisabled}
      className={`${classNames} ${theme === 'dark' ? s.btnDark : s.btnLight}`}
      onClick={callBack}
    >
      {title}
    </button>
  )
}
