
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  module:{
    rules:[
      {
        test:/\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:[
              ['@babel/preset-env',{
                targets:{
                  chrome:'58'
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlPlugin({
      template:'./src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer:{
    disableHostCheck:true,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}