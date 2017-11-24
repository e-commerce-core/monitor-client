const shelljs = require('shelljs');
const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  shelljs.rm('-rf', 'dist');
}

module.exports = {
  input: 'src/index.js',
  output: {
    file: `dist/monitor-client2${isProd ? '.min' : ''}.js`,
    format: 'umd'
  },
  exports: 'named',
  amd: { id: 'WebMonitor' },
  name: 'WebMonitor',
  sourcemap: true,
  plugins: [resolve(), babel({
    exclude: 'node_modules/**'
  }), sourcemaps()].concat(isProd ? [
    uglify()
  ] : [])
};
