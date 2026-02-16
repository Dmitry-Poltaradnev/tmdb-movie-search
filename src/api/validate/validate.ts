import type { ZodType } from 'zod'

export const validate =
  <T>(schema: ZodType<T>) =>
  (response: unknown): T => {
    const parsed = schema.safeParse(response)

    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      throw new Error('Invalid API response')
    }

    return parsed.data
  }
