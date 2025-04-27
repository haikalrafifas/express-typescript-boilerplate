import { Request } from 'express';
import { JsonResponse } from '@/types/json-response';

const logger = require('@/utilities/logger');
const authService = require('@/services/auth-service');

exports.register = async (req: Request, res: JsonResponse) => {
  return res.success('Register');
};

exports.login = async (req: Request, res: JsonResponse) => {
  const { email, password } = req.body;
  
  try {
    const user = authService.authenticate(email, password);

    if (!user) {
      logger.error('Invalid credentials');
      return res.error(401, 'Invalid credentials')
    }

    return res.success('Successfully logged in!', { user });
  } catch (error) {
    logger.error('Login error', error);
    return res.error();
  }
};

exports.refresh = async (req: Request, res: JsonResponse) => {
  return res.success('Refresh Token');
};
