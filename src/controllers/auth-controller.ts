import { Request } from 'express';
import { AuthenticatedRequest, JsonResponse } from '@/types/express-extension';

const logger = require('@/utilities/logger');
const authService = require('@/services/auth-service');

exports.register = async (req: Request, res: JsonResponse) => {
  const { email } = req.body;

  try {
    if (await authService.findUserByEmail(email)) {
      return res.error(400, 'User already registered');
    }

    const user = await authService.register(req.body);

    return res.success('Successfully registered new user!', user);
  } catch (error: any) {
    logger.error('auth@register', error);
    return res.error();
  }
};

exports.login = async (req: Request, res: JsonResponse) => {
  const { email, password } = req.body;
  
  try {
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return res.error(400, 'Invalid credentials');
    }

    if (!authService.verify(password, user.password)) {
      return res.error(400, 'Invalid credentials');
    }

    const authenticatedUser = await authService.authenticate(user);

    return res.success('Successfully logged in!', authenticatedUser);
  } catch (error: any) {
    logger.error('auth@login', error);
    return res.error();
  }
};

exports.refresh = async (req: AuthenticatedRequest, res: JsonResponse) => {
  const refreshToken = req.body.refresh_token;

  try {
    // if refresh token not found, then return error response
    const user = await authService.findUserByRefreshToken(refreshToken);
    if (!user) {
      return res.error(400, 'Invalid refresh token');
    }
    
    // refresh the access token
    const authenticatedUser = await authService.authenticate(user);

    return res.success('Successfully refreshed access token!', authenticatedUser);
  } catch (error: any) {
    logger.error('auth@refresh', error);
    return res.error();
  }
};
