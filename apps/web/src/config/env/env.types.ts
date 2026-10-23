import type { z } from 'zod';

import type { envSchema } from './env.schema';

export type Env = z.infer<typeof envSchema>;

/** Raw NEXT_PUBLIC_* values as they arrive from the environment. */
export type RawEnv = Record<string, string | undefined>;
