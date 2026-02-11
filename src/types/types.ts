export type GenreMovie = {
  id: number
  name: string
}
export type GenresResponse = {
  genres: GenreMovie[]
}
export type VoteAverage = number[]

export type SortValueType = { sortOption: string; title: string }
