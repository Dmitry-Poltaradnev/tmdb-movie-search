import { Skeleton } from '@mui/material'
import s from './MoviePageSkeleton.module.css'

export const MoviePageSkeleton = () => {
  return (
    <div className={s.moviePageSkeletonWrap}>
      <Skeleton
        className={s.moviePageSkeletonFirst}
        variant="rectangular"
        height={150}
        width={400}
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.moviePageSkeletonSecond}
        variant="rectangular"
        height={40}
        width={400}
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.moviePageSkeletonFirst}
        variant="rectangular"
        height={150}
        width={400}
        sx={{ bgcolor: '#989696' }}
      />
      <Skeleton
        className={s.moviePageSkeletonSecond}
        variant="rectangular"
        height={40}
        width={400}
        sx={{ bgcolor: '#989696' }}
      />
    </div>
  )
}
