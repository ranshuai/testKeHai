var isDebug = (process.env.DEBUG === 'true');
console.log('isDebug:', isDebug);

var path = require('path');
var webpack = require('webpack');
var publicPath = isDebug ? "http://localhost:3000/front/site/" : '/site/';


var ROOT_PATH = path.resolve(__dirname);
var CSS_PATH = path.resolve(ROOT_PATH,'edition/css');
var APP_PATH = path.resolve(ROOT_PATH,'edition/components');
var TEM_PATH = path.resolve(ROOT_PATH,'edition');
var BUILD_PATH = path.resolve(ROOT_PATH,'../../', 'site');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin= require('html-webpack-plugin');

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.NODE_DEV || 'true'))
});

var uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});


var alias= {
    'css': path.join(__dirname, './edition', 'css'),
    'vendors': path.join(__dirname, './edition','vendors'),
    'model':  path.join(__dirname, './edition','model'),
    'template':  path.join(__dirname, './edition','template')
};

/***************************************************/
var entry = {
    index:path.resolve(APP_PATH,'index.js'),
    list:path.resolve(APP_PATH,'list.js'),
    vendors:[
        // 'jquery',
        // path.resolve(CSS_PATH, 'base.css')
    ]
};
var output = {
    path:BUILD_PATH,
    filename:'js/[name].js',
    publicPath: publicPath
};
var plugins= [
    definePlugin,
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _: "underscore"
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css'),
    // new HtmlWebpackPlugin({
    //     filename:'index.html',
    //     template:'./edition/index.html',
    //     inject:true
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];


var pages = [{
    favicon:'/front/sanhai/images/favicon.ico',
    template:path.resolve(TEM_PATH,'index.html'), //页面入口
    filename:path.resolve(BUILD_PATH,'index.html'), //页面出口
    chunks:['index','vendors']
},{
    favicon:'/front/sanhai/images/favicon.ico',
    template:path.resolve(TEM_PATH,'list.html'), //页面入口
    filename:path.resolve(BUILD_PATH,'list.html'), //页面出口
    chunks:['list','vendors']
}
];

if(!isDebug){
    plugins.push(uglifyJS);
    pages.forEach(function(o){
        var template = o.template;
        var filename = o.filename;
        var params = {
            chunks: o.chunks,
            template:template,
            filename:filename,
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:false
            }
        };

        plugins.push(new HtmlWebpackPlugin(params));
    });
}

var externals = {
  'sanhai':'window.sanhai'
};


/***************************************************/

var config = {
    entry:entry,
    output:output,
    devServer:{
        hot: false,
        inline: true,
        port:3000,
        //colors:true,
        contentBase:'./edition/components'
    },
    module:{
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: __dirname,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test:/\.css$/,
                loader: isDebug ? 'style-loader!css-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/,
                loader: "url?limit=8192&name=images/[name].[ext]"
            },
            {
                test: /\.(html|hbs)$/,  //加载html文件
                loader: "handlebars-loader"
            }
        ]
    },
    resolve: {
        root: [process.cwd() + '/sanhai', process.cwd() + '/node_modules'], // 绝对路径
        extensions: ['', '.coffee', '.js', '.jsx', '.json'],
        alias: alias
    },
    plugins:plugins
};

if(isDebug){
    config['devtool']='#source-map';
}


module.exports = config;
