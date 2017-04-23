const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推

module.exports = {
    entry: './src/App.jsx',
    output: {
        path:'./static',
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader',
                include: [APP_PATH]
            },
            {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx-loader', 'babel-loader'],
                include: [APP_PATH]
            },
            {
                test: /\.css$/,
                include: [APP_PATH],
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test: /\.scss$/,
                include: [APP_PATH],
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=8192&name=asserts/[name]-[hash:5].[ext]!image-webpack-loader',
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                include: [APP_PATH]
            }
        ]
    },
    postcss:[
        require('autoprefixer')({
            broswers: ['last 5 versions']
        })
    ],
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html'
        })
    ]
};