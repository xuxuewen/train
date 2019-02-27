
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {

  module:{
    rules:[
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
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
    })
  ]
}