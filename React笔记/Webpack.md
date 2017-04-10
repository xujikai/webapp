## 入口文件
## 多个入口文件
## Babel加载器
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