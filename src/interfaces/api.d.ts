import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      validated?: any;
      lang?: string;
    }

    interface Response {
      success: (message: string, data?: any, meta?: any) => Response;
      error: (
        statusCode?: number,
        message?: string,
        errors?: Record<string, string[]> | any[],
      ) => Response;
      setCookie: (key: string, value: string) => Response;
    }
  }
}
