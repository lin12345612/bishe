const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath : './',
    productionSourceMap : false,
    configureWebpack : config =>{
        if(process.env.NODE_ENV === 'production'){
            return {
                plugins : [new CompressionPlugin({
                    test : /\.js$|\.html$|\.css/,      //匹配文件名
                    threshold : 10240,           //对超过10K的数据进行压缩
                    deleteOriginalAssets :false  //是否删除文件
                })]
            }
        }
    }
}