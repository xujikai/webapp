##局部作用域
CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。<br/>
产生局部作用域的唯一方法，就是使用一个独一无二的class的名字，不会与其他选择器重名。<br/>
这就是 CSS Modules 的做法。
##全局作用域
CSS Modules 允许使用:global(.className)的语法，声明一个全局规则。<br/>
凡是这样声明的class，都不会被编译成哈希字符串。
##定制哈希类名
##Class的组合
一个选择器可以继承另一个选择器的规则，这称为"组合"。
##输入其它模块
选择器也可以继承其他CSS文件里面的规则。
##输入变量
CSS Modules 支持使用变量，不过需要安装 PostCSS 和 postcss-modules-values。
	
	$ npm install --save postcss-loader postcss-modules-values

把postcss-loader加入webpack.config.js

	var values = require('postcss-modules-values');
	
	module.exports = {
	  entry: __dirname + '/index.js',
	  output: {
	    publicPath: '/',
	    filename: './bundle.js'
	  },
	  module: {
	    loaders: [
	      {
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loader: 'babel',
	        query: {
	          presets: ['es2015', 'stage-0', 'react']
	        }
	      },
	      {
	        test: /\.css$/,
	        loader: "style-loader!css-loader?modules!postcss-loader"
	      },
	    ]
	  },
	  postcss: [
	    values
	  ]
	};

接着，在colors.css里面定义变量。

	@value blue: #0c77f8;
	@value red: #ff0000;
	@value green: #aaf200;

App.css可以引用这些变量。

	@value colors: "./colors.css";
	@value blue, red, green from colors;
	
	.title {
	  color: red;
	  background-color: blue;
	}