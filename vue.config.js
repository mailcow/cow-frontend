var path = require('path');

module.exports = {
  publicPath: '/betaclient/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }, 
  configureWebpack: {
    resolve: {
      alias: {
        // Mailcow Aliases
        'package': path.resolve(__dirname, './package.json'),
        'mailcow-layouts': path.resolve(__dirname, 'src/Layouts'),
        'mailcow-views': path.resolve(__dirname, 'src/views'),
        'mailcow-store': path.resolve(__dirname, 'src/store'),
        'mailcow-services': path.resolve(__dirname, 'src/services'),
        'mailcow-config': path.resolve(__dirname, 'src/config'),
        'mailcow-components': path.resolve(__dirname, 'src/components'),
        'mailcow-router': path.resolve(__dirname, 'src/router'),
        'mailcow-mixins': path.resolve(__dirname, 'src/mixins'),
        'mailcow-utils': path.resolve(__dirname, 'src/utils')
      }
    }
  }
}
