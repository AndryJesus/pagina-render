import { z } from 'zod/v4';

export const emailSchema = z.object({
  id: z.number(),
  email: z.email(),
});
