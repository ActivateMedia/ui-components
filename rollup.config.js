const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const image = require('@rollup/plugin-image');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true
      }),
      postcss({
        extract: true,
        minimize: true,
        use: [
          [
            'sass',
            {
              includePaths: ['./src/styles']
            }
          ]
        ]
      }),
      terser(),
      image()
    ],
    external: ['react', 'react-dom', 'react-inlinesvg']
  }
];
