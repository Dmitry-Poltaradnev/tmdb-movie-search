import { MovieCard } from './MovieCard.tsx'

type MovieSectionPropsType = {
  movies: any
  title: string
  category: 'popular' | 'upcoming' | 'nowPlaying'
}

export const MovieSection = ({ title, category, movies }: MovieSectionPropsType) => {
  return (
    <div>
      <h3>Category : {title}</h3>
      {movies?.results.map((item: any) => (
        <MovieCard movie={item} key={item.id} />
      ))}
    </div>
  )
}
