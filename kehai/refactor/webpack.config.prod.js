var webpack = require('webpack');
var mod = process.env.MOD || 'kehai';
var path = require('path');
console.log('mod:', mod);
var baseConfig = require(`./build/webpack.base.${mod}`);

/**
 * webpacｋ插件配置
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
  __ENV__: `"${process.env.NODE_ENV.toString()}"`,
  'process.env.NODE_ENV': `"${process.env.NODE_ENV.toString()}"`
});

var plugins = baseConfig.plugins.concat([
  definePlugin,
  new webpack.NoErrorsPlugin()
]);

module.exports = {

  entry: baseConfig.entry,

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
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
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
        test: /\.(html|xml)$/,
        loader: 'file?name=templates/[1]/[2]&regExp=([^/]+)[/\\\\]templates[/\\\\](.+)$'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url?limit=8192&name=images/[hash:8].[name].[ext]'
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
