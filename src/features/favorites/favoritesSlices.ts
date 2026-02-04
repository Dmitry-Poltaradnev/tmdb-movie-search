import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type MovieType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const getFavoriteMovies = () => {
  const data = localStorage.getItem('favoriteMovies')
  return data ? JSON.parse(data) : []
}

const favoriteMoviesSlices = createSlice({
  name: 'favoriteMovies',
  initialState: getFavoriteMovies(),
  reducers: {
    addMovie: (state, action: PayloadAction<MovieType>) => {
      const isLoaded = state.some((movie: MovieType) => movie.id === action.payload.id)
      if (!isLoaded) {
        state.push(action.payload)
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(state))
    },
    removeMovie: (state, action: PayloadAction<MovieType>) => {
      const newState = state.filter((movie: MovieType) => movie.id !== action.payload.id)
      localStorage.setItem('favoriteMovies', JSON.stringify(newState))
      return newState
    },
  },
})

export const { addMovie, removeMovie } = favoriteMoviesSlices.actions
export const favoriteMoviesReducer = favoriteMoviesSlices.reducer
