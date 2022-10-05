const { merge } = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  //devtoll 生产打包模式 inline-source-map
  devtool: 'eval',
  devServer: {
    //服务器 生成文件的 临时根目录
    contentBase: 'assets',
    inline: true,
    host: 'localhost',
    port: 8080,
    open: true,
    publicPath: "/",
    // hot: true
  },
});