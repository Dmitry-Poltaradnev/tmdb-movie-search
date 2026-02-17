import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MovieTypes } from '../../../api/schema/movies.schema.ts'

const getFavoriteMovies = () => {
  const data = localStorage.getItem('favoriteMovies')
  return data ? JSON.parse(data) : []
}

const favoriteMoviesSlices = createSlice({
  name: 'favoriteMovies',
  initialState: getFavoriteMovies(),
  reducers: {
    addMovie: (state, action: PayloadAction<MovieTypes>) => {
      const isLoaded = state.some((movie: MovieTypes) => movie.id === action.payload.id)
      if (!isLoaded) {
        state.push(action.payload)
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(state))
    },
    removeMovie: (state, action: PayloadAction<MovieTypes>) => {
      const newState = state.filter((movie: MovieTypes) => movie.id !== action.payload.id)
      localStorage.setItem('favoriteMovies', JSON.stringify(newState))
      return newState
    },
  },
})

export const { addMovie, removeMovie } = favoriteMoviesSlices.actions
export const favoriteMoviesReducer = favoriteMoviesSlices.reducer
