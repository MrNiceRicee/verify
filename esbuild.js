const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  bundle: true,
  sourcemap: true,
  minify: true,
  platform: 'node',
  target: ['node10.4'],
}).catch(() => process.exit(1));
