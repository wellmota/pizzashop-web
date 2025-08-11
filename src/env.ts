import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_URL: z.string().default('/api'),
  VITE_ENABLE_API_DELAY: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  VITE_DEMO_EMAIL: z.string().email().optional(),
});

export const env = envSchema.parse(import.meta.env);
