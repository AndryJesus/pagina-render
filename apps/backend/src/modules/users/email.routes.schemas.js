import { z } from 'zod/v4';

export const forgotPasswordRouteSchema = {
  body: z.object({
    email: z.string(),
  }),
};

export const resetPasswordRouteSchema = {
  body: z.object({
    token: z.string(),
  }),
};
