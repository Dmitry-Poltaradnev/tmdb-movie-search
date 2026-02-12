import { Skeleton } from '@mui/material'

export const MoviesCardSkeleton = () => {
  return (
    <div
      style={{
        width: '200px',
        height: '300px',
        background: 'red',
      }}
    >
      <Skeleton variant="rectangular" width={200} height={300} />
      <Skeleton variant="text" width={150} height={30} />
    </div>
  )
}
