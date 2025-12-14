import { Request, Response, NextFunction } from 'express';

import cookieConfig from '../config/cookie';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  meta?: any;
  errors?: Record<string, string[]> | any[];
}

/**
 * Attach custom response properties to the `res` object.
 */
export default function apiResponse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /**
   * Success response property
   *
   * @param message
   * @param data
   * @returns
   */
  res.success = (
    message: string,
    data?: any,
    meta?: any,
    statusCode: number = 200,
  ): Response => {
    const payload: ApiResponse = { success: true, message };

    if (data) payload.data = data;
    if (meta) payload.meta = meta;

    return res.status(statusCode).json(payload);
  };

  /**
   * Error response property
   *
   * @param statusCode
   * @param message
   * @param errors
   * @returns
   */
  res.error = (
    statusCode: number = 500,
    message: string = 'Internal server error',
    errors?: Record<string, string[]> | any[],
  ): Response => {
    const payload: ApiResponse = { success: false, message };

    if (errors && Object.keys(errors).length > 0) {
      payload.errors = errors;
    }

    return res.status(statusCode).json(payload);
  };

  /**
   * Cookie header property
   *
   * @param key
   * @param value
   * @returns
   */
  res.setCookie = (key: string, value: string): Response => {
    return res.cookie(key, value, cookieConfig);
  };

  next();
}
