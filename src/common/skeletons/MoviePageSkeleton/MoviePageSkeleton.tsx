import { Skeleton } from '@mui/material'
import s from './MoviePageSkeleton.module.css'

export const MoviePageSkeleton = () => {
  return (
    <div className={s.moviePageSkeletonWrap}>
      <Skeleton
        className={s.moviePageSkeletonFirst}
        variant="rectangular"
        height={280}
        width="90%"
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.moviePageSkeletonSecond}
        variant="rectangular"
        height={340}
        width="90%"
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.moviePageSkeletonFirst}
        variant="rectangular"
        height={490}
        width="90%"
        sx={{ bgcolor: '#989696' }}
      />
    </div>
  )
}
