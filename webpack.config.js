const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'src/client.js'),
  output:{
    path:__dirname,
    filename:'public/chat-client.js'
  },
  devtool:'inline-source-map',
  module:{
    rules:[
      {test:/\.js$/,loader:'babel-loader',options:{presets:['es2015','react']}},
      {test:/\.css$/,loader:'style-loader'},
      {test:/\.css$/,loader:'css-loader',options:{modules:true,localIdentName: "[name]__[local]___[hash:base64:5]" }}
    ]
  }
  /*
  ,plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV':JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
  */
}