const path = require('path')

module.exports = {

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    // devServer: {
    // 	// 设置基本目录结构
    // 	contentBase: path.resolve(__dirname,'../dist'),
    // 	// 服务IP
    // 	host: 'localhost',
    // 	compress: true,
    // 	port: '8000'
    // }
}