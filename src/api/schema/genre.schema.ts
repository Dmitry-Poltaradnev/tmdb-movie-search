import z from 'zod'

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})
export const GenreResponseSchema = z.object({
  genres: z.array(GenreSchema),
})
export type GenreType = z.infer<typeof GenreSchema>
export type GenreResponseType = z.infer<typeof GenreResponseSchema>
