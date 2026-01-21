export const MovieCard = ({ movie }: any) => {
  console.log(movie)
  return (
    <div>
      Title : {movie.title}
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movieImg" />
    </div>
  )
}
