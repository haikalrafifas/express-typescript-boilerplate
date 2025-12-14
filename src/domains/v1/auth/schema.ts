import { z } from 'zod';

import { body as user } from '../user/schema';

export const register = user.safeExtend({});

export const login = z.object({
  username: z
    .string()
    .max(32, { message: 'Username must be at most 32 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
