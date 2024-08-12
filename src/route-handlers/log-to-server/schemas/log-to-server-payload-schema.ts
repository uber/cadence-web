import { z } from 'zod';

const logToServerPayloadSchema = z.object({
  level: z.string(),
  message: z.string(),
  payload: z.any(),
});

export default logToServerPayloadSchema;
