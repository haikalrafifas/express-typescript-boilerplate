import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/database/{migrations,seeders}/*'],
  platform: 'node',
  format: 'esm',
  target: 'node20',
  outDir: 'dist',
  clean: true,
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  skipNodeModulesBundle: true,
  bundle: true,
  shims: true,
});
