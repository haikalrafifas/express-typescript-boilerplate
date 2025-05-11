/**
 * Authentication Middleware
 *
 * Provides middleware functions for verifying JWT tokens
 * @module middlewares/authMiddleware
 */

import { NextFunction } from 'express';
import { AuthenticatedRequest, JsonResponse } from '@/types/express-extension';

const jwt = require('@/utilities/jwt');

/**
 * Middleware to verify access tokens in the Authorization header
 * @param {AuthenticatedRequest} req - Express request object
 * @param {JsonResponse} res - Express JSON response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void}
 */
exports.accessToken = (req: AuthenticatedRequest, res: JsonResponse, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.error(401, 'Unauthorized');
    return;
  }

  try {
    const payload = jwt.access.verify(token);
    req.user = payload;

    // Make sure req.body exists before setting id
    if (!req.body) {
      req.body = {};
    }

    // Copy user ID from payload to req.body for controller access
    if (payload && payload.id) {
      try {
        req.body.id = payload.id;
      } catch (bodyError) {
        // Try using defineProperty as an alternative approach
        try {
          Object.defineProperty(req, 'body', {
            value: { ...(req.body || {}), id: payload.id },
            writable: true,
            configurable: true,
          });
        } catch (propError) {
          const propErrMsg = propError instanceof Error ? propError.message : String(propError);
          throw new Error(`Cannot set user ID in request: ${propErrMsg}`);
        }
      }
    }

    next();
  } catch (error) {
    res.error(401, 'Invalid or expired access token');
  }
};

/**
 * Middleware to verify refresh tokens in the request body
 * @param {AuthenticatedRequest} req - Express request object
 * @param {JsonResponse} res - Express JSON response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void}
 */
exports.refreshToken = (req: AuthenticatedRequest, res: JsonResponse, next: NextFunction): void => {
  const refreshToken = req.body.refresh_token;

  if (!refreshToken) {
    res.error(401, 'Refresh token is required!');
    return;
  }

  try {
    const payload = jwt.refresh.verify(refreshToken);
    req.user = payload;
    next();
  } catch (error) {
    // Token is invalid, but we let the controller handle this case
    // to potentially issue a new token or handle the error appropriately
    next();
  }
};

/**
 * Middleware to verify email verification tokens in the request body
 * @param {AuthenticatedRequest} req - Express request object
 * @param {JsonResponse} res - Express JSON response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void}
 */
exports.verificationToken = (
  req: AuthenticatedRequest,
  res: JsonResponse,
  next: NextFunction,
): void => {
  const { token: verificationToken } = req.body;

  if (!verificationToken) {
    res.error(401, 'Token is required!');
    return;
  }

  try {
    const payload = jwt.verification.verify(verificationToken);
    req.user = payload;
    next();
  } catch (error) {
    res.error(401, 'Invalid or expired verification token');
  }
};
