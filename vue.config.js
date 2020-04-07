const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://60.205.247.74:8001', // target host
        ws: true, // proxy websockets 
        changeOrigin: true // needed for virtual hosted sites                
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.fallback.options.name = 'img/[name].[ext]'
        return options
      }).end()      
      // .rule('images')
      // .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      // .use('image-webpack-loader')
      // .loader('image-webpack-loader')
      // .options({ bypassOnDebug: true })
    config.resolve.alias
      .set('static', resolve('static')).end()
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
        threshold: 10240, // 文件大小大于这个值时启用压缩
        deleteOriginalAssets: false // 压缩后保留原文件
      })
    ]
  }
}
