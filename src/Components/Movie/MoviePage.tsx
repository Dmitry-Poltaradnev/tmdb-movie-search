import { useParams } from 'react-router-dom'

export const MoviePage = ({ movie }: any) => {
  const { id } = useParams()

  return <div>Movie :{id}</div>
}
