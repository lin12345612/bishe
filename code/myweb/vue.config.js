const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    publicPath : './',
    devServer : {
        port : '8080',
        open : false,
        proxy : {
            './' : {
                target: "http://localhost:3000/api",//服务器api地址
                changeOrigin : true,//是否跨域
                ws: true, // proxy websockets
                pathRewrite: {//重写路径
                    "^/api": ''
                }
            }
        }
    },
    productionSourceMap:false,
    chainWebpack:(config) => {
        config.resolve.alias
            .set('@',resolve('src'))
            .set('static',resolve('src/assets'))
    },
    configureWebpack:config =>{
        if(process.env.NODE_ENV === 'production'){
            return {
                plugins:[
                    new CompressionPlugin({
                    test:/\.js$|\.html$|\.css/,   //匹配文件名
                    threshold : 10240, //对超过10K的文件进行压缩
                    deleteOriginalAssets:false    //不删除源文件
                })
            ]
            }
        }
    }
}