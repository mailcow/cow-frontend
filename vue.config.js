var path = require('path');
const IS_LOCAL = process.env.NODE_ENV !== 'production';
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  runtimeCompiler: false,
  devServer: {
    disableHostCheck: true
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: IS_LOCAL ? [] : [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg|png|jpg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg|png|jpg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      })
    ],
    resolve: {
      alias: {
        // Mailcow Aliases
        'package': path.resolve(__dirname, './package.json'),
        'mailcow-views': path.resolve(__dirname, 'src/views'),
        'mailcow-store': path.resolve(__dirname, 'src/store'),
        'mailcow-services': path.resolve(__dirname, 'src/services'),
        'mailcow-config': path.resolve(__dirname, 'src/config'),
        'mailcow-components': path.resolve(__dirname, 'src/components'),
        'mailcow-router': path.resolve(__dirname, 'src/router')
      }
    }
  }
}
