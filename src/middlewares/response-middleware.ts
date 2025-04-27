import { Request, NextFunction } from 'express';
import { JsonResponse } from '@/types/json-response';

/**
 * Attach response helper methods to the `res` object.
 */
module.exports = (req: Request, res: JsonResponse, next: NextFunction) => {
  // Success response helper
  res.success = (message: string, data?: any) => {
    const payload: any = { statusCode: 200, message };
    if (data) payload.data = data;
    return res.status(200).json(payload);
  };

  // Error response helper
  res.error = (statusCode: number = 500, message: string = 'Internal server error', errors?: any[]) => {
    const payload: any = { statusCode, message };
    if (errors) payload.errors = errors;
    return res.status(statusCode).json(payload);
  };

  next();
};
