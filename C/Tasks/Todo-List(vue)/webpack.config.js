const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' 
      // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      // 若此处不配置，则挂载的元素会从页面上消失
    }
  }
}