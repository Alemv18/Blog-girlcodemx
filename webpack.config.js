const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('./static/js'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules:[
    {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }], 
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }, 
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './'
  }
};
