
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  shims: false,
  target: 'es2020',
  external: [], // Add dependencies here if you want to exclude them from bundling
});
