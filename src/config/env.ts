import { z } from 'zod'

export const env = z
  .object({
    DB_URL: z.string().min(1),
    DB_NAME: z.string().min(1),
  })
  .parse(Bun.env)
