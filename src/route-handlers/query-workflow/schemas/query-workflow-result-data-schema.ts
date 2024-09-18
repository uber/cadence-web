import { z } from 'zod';

export const queryWorkflowResultDataSchema = z
  .string()
  .transform((d): object => {
    const parsedJSON = JSON.parse(Buffer.from(d, 'base64').toString('utf-8'));
    return z.object({}).passthrough().parse(parsedJSON);
  });
