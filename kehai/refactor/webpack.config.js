var webpack = require('webpack');

var path = require('path');
var mod = process.env.MOD || 'kehai';
console.log('mod:', mod);

// var arguments = process.argv.splice(2);

var baseConfig = require(`./build/webpack.base.${mod}`);

/**
 * webpacｋ插件配置
 */

// var definePlugin = new webpack.DefinePlugin({
//   __ENV__: `"${process.env.NODE_ENV.toString()}"`,
//   'process.env.NODE_ENV': `"${process.env.NODE_ENV.toString()}"`
// });
 /* windows 兼容*/
var definePlugin = new webpack.DefinePlugin({
  __ENV__: `"${'development'.toString()}"`,
   'process.env.NODE_ENV': `"${'development'.toString()}"`
 });

var plugins = baseConfig.plugins.concat([
  definePlugin,
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
]);


module.exports = {

  devtool: '#source-map',

  entry: baseConfig.entry,

  devServer: baseConfig.devServer,

  output: baseConfig.output,

  externals: baseConfig.externals,

  resolve: {
    root: [process.cwd() + '/dev', process.cwd() + '/node_modules'], // 绝对路径
    extensions: ['', '.coffee', '.js', '.jsx', '.json', '.vue'],
    alias: baseConfig.alias
  },

  resolveLoader: {
    fallback: [path.join(__dirname, './node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.tpl$/,
        loader: "tmodjs"
      },
      { 
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [
            __dirname + "/apps/helper/handlebars",
            __dirname + "/apps/page/common"
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(html|xml)$/,
        loader: 'file?name=templates/[1]/[2]&regExp=([^/]+)[/\\\\]templates[/\\\\](.+)$'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url?limit=8192&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: plugins
};
