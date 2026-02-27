import { Skeleton } from '@mui/material'
import s from './MovieCardSkeleton.module.css'

export const MoviesCardSkeleton = () => {
  return (
    <div className={s.cardSkeleton}>
      <Skeleton
        className={s.posterSkeleton}
        variant="rectangular"
        width={180}
        height={250}
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.descSkeleton}
        variant="rectangular"
        width={180}
        height={50}
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.buttonSkeleton}
        variant="rectangular"
        width={180}
        height={42}
        sx={{ bgcolor: '#989696' }}
      />
    </div>
  )
}
