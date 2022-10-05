const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//webpack 查看打包模块依赖关系以及size 插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


console.log()
module.exports = {
  target: 'web', //管理node服务端项目的时候 改为 node
  //指定入口
  entry: {
    main: './app/main.js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "html plugn page",
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  //解析
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, '../src/util/'),
      hbs: path.resolve(__dirname, '../src/views')
    },
    //第三方模块解析来源
    modules: ['node_modules'],
    //解析 模块后缀默认 ext
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  },

  output: {
    //输出文件名称
    filename: '[name].build.js',
    //输出文件路径
    path: path.resolve(__dirname, '../dist'),
    // publicPath: "/"
    // library:''
    // publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",

          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ]
  }
};