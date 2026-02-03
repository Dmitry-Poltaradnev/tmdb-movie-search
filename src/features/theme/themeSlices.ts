import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
}
const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() },
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
      localStorage.setItem('theme', newTheme)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
