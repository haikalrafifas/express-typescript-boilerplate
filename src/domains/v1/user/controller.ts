import { Request, Response } from 'express';
import * as userService from './service.js';
import { authenticate } from '../auth/service.js';

export const show = async (req: Request, res: Response) => {
  const userId = (req as any).user.sub;

  const data = await userService.findByUuid(userId);
  if (!data) {
    return res.error(404, 'User not found');
  }

  return res.success('Successfully get user profile!', data.toJSON());
};

export const update = async (req: Request, res: Response) => {
  const payload = (req as any).validated;
  const userId = (req as any).user.sub;

  const data = await userService.findByUuid(userId);
  if (!data) {
    return res.error(404, 'User not found');
  }

  const updated = await userService.update(data, payload);

  const token = await authenticate(updated);

  return res.success('Successfully updated user profile!', {
    token,
    user: updated.toJSON(),
  });
};

/**
 * Admin Actions
 */
export const adminList = async (req: Request, res: Response) => {
  const { page, limit } = (req as any).validated;

  const { data, meta } = await userService.fetchPaginated({
    page,
    limit,
  });

  return res.success('Successfully get accounts!', data, meta);
};

export const adminUpdate = async (req: Request, res: Response) => {
  const payload = (req as any).validated;
  const username = (req as any).validated['username'];

  const data = await userService.findByUsername(username);
  if (!data) {
    return res.error(404, 'Account not found');
  }

  payload.verified_at = payload.verified ? new Date() : null;
  if (payload.verified !== undefined) delete payload.verified;

  const updated = await userService.update(data, payload);

  return res.success('Successfully updated user account!', updated.toJSON());
};
