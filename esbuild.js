const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: ['esnext', 'es2018', 'es6']
})
.catch(() => process.exit(1));