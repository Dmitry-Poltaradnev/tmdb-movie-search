import z from 'zod'

export const ActorSchema = z.object({
  adult: z.boolean(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  order: z.number(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
})

export type ActorType = z.infer<typeof ActorSchema>
