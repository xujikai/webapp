const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/App.jsx',
        // vendor: 'moment'
    },
    output: {
        publicPath:'http://192.168.0.92:8080/xxx',
        path: path.resolve(__dirname, 'build'),
        filename: 'dist/[name].js'
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
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {loader: 'less-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    // use style-loader in development
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader", options: {sourceMap: true} },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        { loader: "sass-loader", options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /^node_modules$/,
                use: [
                    'url-loader?limit=8192&name=asserts/[name]-[hash:5].[ext]'
                ],
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                include: [APP_PATH]
            }
        ]
    },
    plugins: [
        //将样式文件打包至此文件中
        new ExtractTextPlugin('style/styles.css'),
        //如果某些包没有修改过，就不会重新打这一部分
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
        }),
        //生成html文件，会自动引入打包后的文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    }
};