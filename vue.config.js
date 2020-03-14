const path = require('path');
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
                target: 'http://localhost:8001',  // target host
                ws: true,  // proxy websockets 
                changeOrigin: true  // needed for virtual hosted sites                
            },
        }
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
        config.resolve.alias
            .set('static', resolve('static'))
    },
    configureWebpack: config => {
        config.module.rules.push({
            // 处理markdown文件
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader"
                }
            ]
        })
    }
}