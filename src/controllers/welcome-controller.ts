import { Request } from 'express';
import { JsonResponse } from '@/types/json-response';

const logger = require('@/utilities/logger');

exports.index = async (req: Request, res: JsonResponse) => {
  try {
    logger.log('Welcome');
    return res.success('Welcome!');
  } catch (error: any) {
    logger.error(error);
    return res.error(500, 'Internal server error', error.message);
  }
};
