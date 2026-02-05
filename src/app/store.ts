import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/tmdbApi.ts'
import { themeReducer } from '../features/theme/themeSlices.ts'
import { favoriteMoviesReducer } from '../features/favorites/favoritesSlices.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeReducer,
    favoriteMovies: favoriteMoviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
export type RootState = ReturnType<typeof store.getState>
