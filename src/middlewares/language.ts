import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to detect and set the user's preferred language
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage) {
    // Parse Accept-Language header, e.g., "en-US,en;q=0.9,id;q=0.8"
    const languages = acceptLanguage.split(',').map((lang) => {
      const [code, q] = lang.trim().split(';q=');
      return { code: code.split('-')[0], q: q ? parseFloat(q) : 1 };
    });

    // Sort by quality and pick the highest
    languages.sort((a, b) => b.q - a.q);
    req.lang = languages[0]?.code || 'en';
  } else {
    req.lang = 'en'; // Default
  }

  next();
};
