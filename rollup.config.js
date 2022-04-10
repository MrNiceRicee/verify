import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.ts',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  plugins: [typescript(), babel({ extensions: ['.ts'] }), terser()],
};
