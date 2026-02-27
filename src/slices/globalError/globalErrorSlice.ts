import { createSlice } from '@reduxjs/toolkit'

type GlobalError = {
  status: number | 'FETCH_ERROR' | 'VALIDATION_ERROR'
  message?: string
}
type GlobalErrorState = {
  error: GlobalError | null
}
const initialState: GlobalErrorState = {
  error: null,
}

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setError, clearError } = globalErrorSlice.actions
export default globalErrorSlice.reducer
