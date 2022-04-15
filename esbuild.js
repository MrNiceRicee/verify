const { build } = require('esbuild');

build({
  entryPoints: ['./index.ts'],
  outdir: 'lib',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: ['esnext'],
}).catch(() => process.exit(1));

