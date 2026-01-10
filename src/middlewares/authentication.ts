import { Request, Response, NextFunction } from 'express';
import JWTAuth from '../utilities/jwt.js';

const unauthorized = (res: Response) => {
  return res.error(401, 'Unauthorized');
};

const expired = (res: Response) => {
  return res.error(401, 'Token expired or invalid');
};

export async function accessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];

  const tokenAbsent = !authHeader || !authHeader.startsWith('Bearer ');
  if (tokenAbsent) return unauthorized(res);

  const token = authHeader.split(' ')[1];
  if (!token) return unauthorized(res);

  // --- Verify token ---
  try {
    const decoded = await JWTAuth.access.verify(token);
    if (!decoded) return expired(res);

    (req as any).user = decoded;

    return next();
  } catch {
    return res.error(401, 'Unauthorized');
  }
}

export async function optionalAccessToken(
  req: Request,
  next: () => Promise<Response>,
) {
  const authHeader = req.headers['authorization'];

  const tokenAbsent = !authHeader || !authHeader.startsWith('Bearer ');
  if (tokenAbsent) return next();

  const token = authHeader.split(' ')[1];
  if (!token) return next();

  // --- Verify token ---
  try {
    const decoded = await JWTAuth.access.verify(token);
    if (!decoded) return next();

    (req as any).user = decoded;

    return next();
  } catch {
    return next();
  }
}

export async function refreshToken() {}

export async function verificationToken() {}
