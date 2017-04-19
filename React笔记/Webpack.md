## 如何使用
首先，安装webpack和webpack-dev-server。

    $ npm i -g webpack@1.x webpack-dev-server@1.x

然后，进入项目目录，执行命令。

    webpack-dev-server

然后，访问网址 http://127.0.0.1:8080 。

## 入口文件

程序入口文件，根据配置文件决定。

    // main.js
    document.write('<h1>Hello World</h1>');

index.html文件，bundle路径需要跟打出的文件路径一致。

    <html>
      <body>
        <!-- 此路径为打包后的文件路径 -->
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>

webpack配置文件，在项目根目录

    // webpack.config.js
    module.exports = {
      entry: './main.js',
      output: {
        filename: 'bundle.js'
      }
    };

## 多个入口文件
打包两个文件bundle1.js和bundle2.js。

    module.exports = {
      entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
      },
      output: {
        filename: '[name].js'
      }
    };

## Babel加载器
babel-loader可以将JSX/ES6文件转换为JS文件。

main.jsx

    const React = require('react');
    const ReactDOM = require('react-dom');

    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.querySelector('#wrapper')
    );

index.html

    <html>
      <body>
        <div id="wrapper"></div>
        <script src="bundle.js"></script>
      </body>
    </html>

webpack.config.js

    module.exports = {
      entry: './main.jsx',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders:[
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
          },
        ]
      }
    };

也可以使用另一种方式

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }

## CSS加载器
首先用CSS-loader读取CSS文件，然后用Style-loader将style标签插入进html页面中。<br/>
不同的加载器之间通过感叹号连接。
## Image加载器
## CSS模块
**css-loader?modules**这个modules可以使用CSS Modules规范。<br/>
你的CSS文件的作用域默认都是局部作用域。你可以使用**:global(...)**修改选择器为全局作用域。
## 使用代码混淆、压缩插件
## 使用三方插件
## 环境标记(开发版本、正式版本)
## 代码分割
## 使用bundle-loader进行代码分割
## 通用代码块
## 供应商代码块
## 暴露全局变量
## 热模块更新