const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ appConfig, postCssConfig }) => {
  const { root, entry, port, mode } = appConfig;

  const isProduction = mode === 'production';
  const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    mode: isProduction ? 'production' : 'development',

    entry: path.resolve(entry),

    output: {
      publicPath: isProduction ? './' : '/',
    },

    optimization: isProduction
      ? {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: false,
                },
              },
            }),
          ],
        }
      : undefined,

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localsConvention: 'camelCase',
              },
            },
            {
              loader: 'postcss-loader',
              // eslint-disable-next-line global-require
              options: { ...postCssConfig },
            },
          ],
        },
        {
          exclude: /node_modules/,
          test: /\.(js|ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                cacheDirectory: true,
                cacheCompression: isProduction,
                compact: isProduction,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                compiler: 'ttypescript',
                context: root,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(woff|woff2|(o|t)tf|eot)$/,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: `assets/fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: `assets/img/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [path.resolve(root, 'node_modules')],
      alias: {
        '@': path.resolve(root, 'src'),
      },
      symlinks: false,
    },

    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },

    devServer: {
      contentBase: path.join(root, 'public'),
      port,
    },

    plugins: [
      isProduction && new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({ React: 'react' }),
      process.env.ANALYZE && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: path.join(root, './public/index.html'),
        inject: 'body',
      }),
    ].filter(Boolean),
  };
};
