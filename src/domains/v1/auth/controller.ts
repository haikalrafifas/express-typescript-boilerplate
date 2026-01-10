import { Request, Response } from 'express';
import * as authService from './service.js';

export const login = async (req: Request, res: Response) => {
  const { username, password } = (req as any).validated;

  const data = await authService.findAccount(username, password);

  if (!data) {
    return res.error(404, 'Account not found');
  }

  if (!data.verified_at) {
    return res.error(403, 'Account not verified');
  }

  const token = await authService.authenticate(data);

  return res.success('Successfully logged in', {
    token,
    user: data.toJSON(),
  });
};

export const register = async (req: Request, res: Response) => {
  const payload = (req as any).validated;
  const { username } = payload;

  const existingUser = await authService.findByUsername(username);

  if (existingUser) {
    return res.error(400, 'Account already exist');
  }

  const newUser = await authService.create(payload);

  return res.success('Successfully registered a new account', newUser.toJSON());
};
