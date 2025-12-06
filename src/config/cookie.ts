import type { CookieOptions } from 'express';

/**
 * Cookie configuration
 */
const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: Number(process.env.COOKIE_TTL) || 7 * 24 * 60 * 60 * 1000,
};

export default cookieConfig;
