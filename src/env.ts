import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  // Base API URL. For the demo we default to '/', so MSW can intercept
  // requests (e.g., '/authenticate', '/me') in production too.
  VITE_API_URL: z.string().default('/'),
  VITE_ENABLE_API_DELAY: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  VITE_DEMO_EMAIL: z.string().email().optional(),
});

export const env = envSchema.parse(import.meta.env);
