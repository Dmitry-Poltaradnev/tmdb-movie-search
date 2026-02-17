import z from 'zod'
import { GenreSchema } from './genre.schema.ts'

export const MovieDetailsSchema = z.object({
  backdrop_path: z.string().nullable(),
  genres: z.array(GenreSchema),
  overview: z.string(),
  runtime: z.number(),
  title: z.string(),
  vote_average: z.number(),
  release_date: z.string(),
})

export type MovieDetailsType = z.infer<typeof MovieDetailsSchema>
