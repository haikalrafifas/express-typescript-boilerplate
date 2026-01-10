import { Router } from 'express';
import authV1 from '../domains/v1/auth/route.js';
import bookV1 from '../domains/v1/book/route.js';

export interface APIRoutes {
  [version: string]: Record<string, Router>;
}

const routes: APIRoutes = {
  v1: {
    auth: authV1,
    books: bookV1,
  },
};

export default routes;
