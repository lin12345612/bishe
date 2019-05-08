const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    publicPath : process.env.NODE_ENV === 'production'?'/pc/':'/',
    devServer : {
        port : '8080',
        open : false,
        proxy: {
            './' :{
                target : 'http://localhost:3000/api', //服务器地址
                changeOrigin : true , //支持跨域
                ws : false,
                pathRewrite : {
                    "^/api":''
                }
            }
        }
    },
    productionSourceMap : false,
    chainWebpack : config =>{
        config.resolve.alias
            .set('@',resolve('src'))
            .set('static',resolve('src/assets'))
            config.plugins.delete('preload')
    },
    configureWebpack : config =>{
        if(process.env.NODE_ENV === 'production'){
            return {
                plugins :[
                    new CompressionPlugin({
                        test : /\.js$|\.html$|\.css/,  //匹配文件名
                        threshold : 10240, //超过10k的文件进行压缩
                        deleteOriginalAssets :false  //不删除源文件
                    })
                ]
            }
        }
    }
}