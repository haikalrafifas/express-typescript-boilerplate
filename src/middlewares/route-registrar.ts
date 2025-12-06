import { Router } from 'express';

export default function registerRoutes(
  list: Record<string, Record<string, Router>>,
) {
  const router = Router();
  const apiRouter = Router();

  router.use('/health', (req, res) => {
    res.json({ status: 'OK' });
  });

  for (const [version, routes] of Object.entries(list)) {
    const versionRouter = Router();
    for (const [path, route] of Object.entries(routes)) {
      versionRouter.use(`/${path}`, route);
    }
    apiRouter.use(`/${version}`, versionRouter);
  }

  router.use('/api', apiRouter);

  router.use((req, res) => {
    return res.error(404, 'Route not found');
  });

  return router;
}
