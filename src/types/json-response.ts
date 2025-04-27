import { Response as ExpressResponse } from 'express';

export type JsonResponse = ExpressResponse & {
  success: (message: string, data?: any) => ExpressResponse;
  error: (statusCode?: number, message?: string, errors?: any[]) => ExpressResponse;
};
