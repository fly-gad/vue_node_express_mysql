/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:19:27
 * @Description: webpack 配置
 */

const path = require('path')

const resolve = function (src) {
    return path.join(__dirname, src);
}

module.exports = {
    publicPath: './', //部署应用包时的基本 URL这样所有的资源都会被链接为相对路径这样打出来的包可以被部署在任意路径。
    outputDir: 'dist', //打包之后生成目录名称
    assetsDir: "assets", //打包之后生成一个静态文件文件夹叫assets
    productionSourceMap: false, //打包之后不生成.map的静态文件
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                'components': resolve('src/components'),
                'server': resolve('src/server'),
            }
        },
    },
    chainWebpack(config) {
        config.module.rule('pug').use('pug-plain-loader').loader('pug-plain-loader').end();
        config.module.rule('js').include.add(resolve('node_modules/@fengqiaogang/safe-set')).end();
    },
    css: { //将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    devServer: { //webpack-dev-server 相关配置和配置反向代理
        open: true, //启动项目后自动打开浏览器 
        host: '0.0.0.0', //设置为0.0.0.0则所有的地址均能访问
        port: 3000, //项目端口号以8088开始
        https: false, //关闭访问target路径
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://devagentapi.myrtb.net', //跨域的url
        //         changeOrigin: true, //是否允许跨域
        //     },
        // },
    },
}