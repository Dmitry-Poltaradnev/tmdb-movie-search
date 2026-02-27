import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/tmdbApi.ts'
import { themeReducer } from '@/slices/theme/themeSlices.ts'
import { favoriteMoviesReducer } from '@/slices/favorites/favoritesSlices.ts'
import globalErrorSlice from '@/slices/globalError/globalErrorSlice.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeReducer,
    favoriteMovies: favoriteMoviesReducer,
    globalError: globalErrorSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
export type RootState = ReturnType<typeof store.getState>
