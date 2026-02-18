import { Skeleton } from '@mui/material'
import s from './WelcomeSectionSkeleton.module.css'

export const WelcomeSectionSkeleton = () => {
  return (
    <Skeleton
      className={s.welSecSkeleton}
      variant="rectangular"
      height={500}
      sx={{ bgcolor: '#989696' }}
    />
  )
}
