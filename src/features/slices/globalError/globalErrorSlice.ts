import { createSlice } from '@reduxjs/toolkit'

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState: {
    error: null as any,
  },
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
