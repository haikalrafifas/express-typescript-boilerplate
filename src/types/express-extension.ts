import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { UserData } from '@/interfaces/user-interface';

/**
 * Interface for accessing authenticated user request
 */
export type AuthenticatedRequest = ExpressRequest & {
  user?: Partial<UserData>;
};

/**
 * Interface for custom express response invocation
 */
export type JsonResponse = ExpressResponse & {
  success: (
    message: string,
    data?: any,
  ) => ExpressResponse;

  error: (
    statusCode?: number,
    message?: string,
    errors?: Record<string, string[]> | any[],
  ) => ExpressResponse;
};
