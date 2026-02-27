import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '@/slices/globalError/globalErrorSlice.ts'

export const ErrorSnackBar = () => {
  const error = useSelector((state: any) => state.globalError.error)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clearError())
  }

  const getMessage = () => {
    if (!error) return ''

    if (error.status === 'FETCH_ERROR') return 'Network error.Check connection.'

    if (error.status === 401) return 'Invalid AUTH TOKEN.'

    if (error.status === 404) return 'Not found (404).'

    return 'Something went wrong.'
  }

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="error" onClose={handleClose}>
        {getMessage()}
      </Alert>
    </Snackbar>
  )
}
