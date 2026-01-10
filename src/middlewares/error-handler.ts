import { Request, Response, NextFunction } from 'express';
import { error } from '../utilities/logger.js';

/**
 * Global error handler middleware
 */
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || undefined;

  error(
    `[${req.method}] ${req.originalUrl} >> ${statusCode} -- ${message}: ${err.stack}`,
  );

  res.error(statusCode, message, errors);
};
