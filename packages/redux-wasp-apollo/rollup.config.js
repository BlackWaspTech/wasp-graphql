import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [resolve()]
}