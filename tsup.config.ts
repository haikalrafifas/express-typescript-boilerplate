import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/database/**/*'],
  platform: 'node',
  format: 'esm',
  target: 'node20',
  outDir: 'dist',
  clean: true,
  dts: false,
  minify: false,
  splitting: false,
  sourcemap: false,
  treeshake: false,
  skipNodeModulesBundle: true,
  bundle: false,
  shims: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});
