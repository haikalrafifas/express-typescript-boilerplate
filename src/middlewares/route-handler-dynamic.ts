import { Router } from 'express';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { info } from '@/utilities/logger';

const router = Router();

router.use('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const domainsPath = join(import.meta.dirname, '../domains');
console.log('domainsPath:', domainsPath);
for (const version of readdirSync(domainsPath)) {
  const versionsPath = join(domainsPath, version);
  for (const domain of readdirSync(versionsPath)) {
    const routePath = join(versionsPath, domain, 'route');

    let fullPath: string | null = null;
    if (existsSync(routePath + '.js')) {
      fullPath = routePath + '.js';
    } else if (existsSync(routePath + '.ts')) {
      fullPath = routePath + '.ts';
    }

    if (!fullPath) continue;

    // Dynamic import (ESM) with file:// URL
    const routeModule = await import(pathToFileURL(fullPath).href);
    const domainRouter = routeModule.default || routeModule;

    const imported = `/api/${version}/${domain}`;
    info(`Mounted ${imported} routes`);
    router.use(imported, domainRouter);
  }
}

router.use((req, res) => {
  return res.error(404, 'Route not found');
});

export default router;
