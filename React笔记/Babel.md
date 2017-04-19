Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

## 配置文件.babelrc
Babel的配置文件是.babelrc，存放在项目的根目录。
使用Babel就是配置该文件。

##### > 基本规则

    {
      "presets": [],
      "plugins": []
    }

presets字段设定转码规则，官方提供以下的规则集。

    # ES2015转码规则
    $ npm install --save-dev babel-preset-es2015

    # react转码规则
    $ npm install --save-dev babel-preset-react

    # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
    $ npm install --save-dev babel-preset-stage-0
    $ npm install --save-dev babel-preset-stage-1
    $ npm install --save-dev babel-preset-stage-2
    $ npm install --save-dev babel-preset-stage-3

然后，规则加完之后

    {
        "presets": [
          "es2015",
          "react",
          "stage-2"
        ],
        "plugins": []
    }

## 命令行转码babel-cli
Babel提供babel-cli工具，用于命令行转码。
常用于package.json中的命令。

    # 全局安装
    $ npm install --global babel-cli
    # 项目安装
    $ npm install --save-dev babel-cli

基本用法如下

    # 转码结果输出到标准输出
    $ babel example.js

    # 转码结果写入一个文件
    # --out-file 或 -o 参数指定输出文件
    $ babel example.js --out-file compiled.js
    # 或者
    $ babel example.js -o compiled.js

    # 整个目录转码
    # --out-dir 或 -d 参数指定输出目录
    $ babel src --out-dir lib
    # 或者
    $ babel src -d lib

    # -s 参数生成source map文件
    $ babel src -d lib -s

在项目中安装后的配置

    {
      // ...
      "devDependencies": {
        "babel-cli": "^6.0.0"
      },
      "scripts": {
        "build": "babel src -d lib"
      },
    }

转码的时候，执行命令

    npm run build

## babel-node
babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL(交互式解析器)环境。
它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

    // 执行代码
    $ babel-node
    > (x => x * 2)(1)

    // 执行脚本文件
    $ babel-node es6.js

## babel-register
babel-register模块改写require命令，为它加上一个钩子。
此后，每次使用require加载.js、.jsx、.es、.es6后缀名的文件，就会先用babel转码。

    $ npm install --save-dev babel-register

使用时，必须首先加载babel-register

    require("babel-register");
    require("./index.js");

##### > 注意
babel-register只会对require命令加载的文件转码，而不会对当前文件转码。
另外，由于它是实时转码，所以，只适合在开发环境中使用。

## babel-core
如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

    $ npm install --save babel-core

基本用法如下

    var babel = require('babel-core');

    // 字符串转码
    babel.transform('code();', options);
    // => { code, map, ast }

    // 文件转码（异步）
    babel.transformFile('filename.js', options, function(err, result) {
      result; // => { code, map, ast }
    });

    // 文件转码（同步）
    babel.transformFileSync('filename.js', options);
    // => { code, map, ast }

    // Babel AST转码
    babel.transformFromAst(ast, code, options);
    // => { code, map, ast }

## babel-polyfill
Babel默认只转换新的js句法，而不转换新的API，
比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
以及定义在全局对象上的方法(比如Object.assign)都不会转码。

举例来说，ES6在Array对象上新增Array.from方法，Babel就不会转码这个方法。
如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

    $ npm install --save babel-polyfill

然后，在脚本头部，加入如下一行代码。

    import 'babel-polyfill';
    // 或者
    require('babel-polyfill');

## 与其他工具配合
许多工具需要Babel进行前置转码，这里举两个例子：ESLint和Mocha。

ESLint用户静态检查代码的语法和风格

    $ npm install --save-dev eslint babel-eslint

然后，在项目根目录下，新建一个配置文件.eslint，在其中添加配置。

    {
      "parser": "babel-eslint",
      "rules": {
        ...
      }
    }

再在package.json中，加入相应的scripts脚本。

    {
        "name": "my-module",
        "scripts": {
          "lint": "eslint my-files.js"
        },
        "devDependencies": {
          "babel-eslint": "...",
          "eslint": "..."
        }
    }

Mocha是一个测试框架，如果需要执行使用ES6语法的测试脚本，可以加入相应的scripts脚本。

    "scripts": {
      "test": "mocha --ui qunit --compilers js:babel-core/register"
    }

上面命令中，--compilers参数指定脚本的转码器，规定后缀名为js的文件，
都需要使用babel-core/register先转码。
