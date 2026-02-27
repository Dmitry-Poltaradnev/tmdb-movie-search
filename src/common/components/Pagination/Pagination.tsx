import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store.ts'
import s from './Pagination.module.css'

type PaginationButtonsProps = {
  count: number
  page: number
  onChange: (page: number) => void
}

export default function PaginationButtons({ count, page, onChange }: PaginationButtonsProps) {
  const theme = useSelector((state: RootState) => state.theme.theme)

  return (
    <div className={s.paginationWrapper}>
      <Stack spacing={2}>
        <Pagination
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme === 'dark' ? 'white' : 'black',
              border: '1px solid',
              borderColor: theme === 'dark' ? 'white' : 'black',
            },

            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: theme === 'dark' ? 'white' : 'black',
              color: theme === 'dark' ? 'black' : 'white',
              borderColor: theme === 'dark' ? 'white' : 'black',
            },
          }}
          count={count}
          page={page}
          onChange={(_, value) => onChange(value)}
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  )
}
