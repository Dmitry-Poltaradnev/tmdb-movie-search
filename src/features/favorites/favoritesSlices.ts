import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type FavoritesState = any

const getFavoriteMovies = () => {
  const favoriteMovies = localStorage.getItem('favoriteMovies')
  return !favoriteMovies ? [] : favoriteMovies
}
const favoriteMoviesSlices = createSlice({
  name: 'favoriteMovies',
  initialState: getFavoriteMovies(),
  reducers: {
    setFavoriteMovies: (state, action: PayloadAction<FavoritesState>) => {
      state.favoriteMovies = action.payload
      localStorage.setItem('favoriteMovies', state.favoriteMovies)
    },
  },
})

export const { setFavoriteMovies } = favoriteMoviesSlices.actions
export const favoriteMoviesReducer = favoriteMoviesSlices.reducer
