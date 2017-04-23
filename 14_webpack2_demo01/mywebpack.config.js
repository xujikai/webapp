const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/components/Test.jsx',
        // vendor: 'moment'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './dist/[name].js'
        //.[chunkhash]
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.css$/,
                // use: ['style-loader','css-loader']
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /^node_modules$/,
                loaders: [
                    'url-loader?limit=8192&name=asserts/[name]-[hash:5].[ext]'
                ],
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                include: [APP_PATH]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./style/styles.css'),
        //配置不重新打没有修改过的包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        })
    ]
};