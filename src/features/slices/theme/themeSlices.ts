import { createSlice } from '@reduxjs/toolkit'

export type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
}
const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      console.log(state.theme)
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
      localStorage.setItem('theme', newTheme)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
