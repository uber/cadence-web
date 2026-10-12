import { z } from 'zod';

export const cadenceJwtClaimsSchema = z
  .object({
    admin: z.boolean().optional(),
    // Invalid email must not reject the token or reach consumers. Drop the claim if invalid.
    email: z.string().trim().email().optional().catch(undefined),
    exp: z.number().optional(),
    groups: z.string().optional(),
    name: z.string().trim().min(1).optional(),
    sub: z.string().trim().min(1).optional(),
  })
  .refine((claims) => claims.sub !== undefined || claims.name !== undefined, {
    message: 'JWT claims must include sub or name',
  });
