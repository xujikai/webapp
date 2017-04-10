## 基本用法
Router组件本身只是一个容器，真正的路由要通过Route组件定义。<br/>
Route组件定义了URL路径与组件的对应关系。你可以同时使用多个Route组件。
## 链接(Link)
## 嵌套路由
## 链接激活样式

	1.<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
	2.<li><Link to="/about" activeClassName="active">About</Link></li>

	3.// modules/NavLink.js
	import React from 'react'
	import { Link } from 'react-router'
	
	export default React.createClass({
	  render() {
	    return <Link {...this.props} activeClassName="active"/>
	  }
	})

	<li><NavLink to="/about">About</NavLink></li>

## 参数

	<Route path="/hello/:name">
	// 匹配 /hello/michael
	// 匹配 /hello/ryan
	
	<Route path="/hello(/:name)">
	// 匹配 /hello
	// 匹配 /hello/michael
	// 匹配 /hello/ryan
	
	<Route path="/files/*.*">
	// 匹配 /files/hello.jpg
	// 匹配 /files/hello.html
	
	<Route path="/files/*">
	// 匹配 /files/ 
	// 匹配 /files/a
	// 匹配 /files/a/b
	
	<Route path="/**/*.jpg">
	// 匹配 /files/hello.jpg
	// 匹配 /files/path/to/file.jpg

匹配规则只会匹配第一个URL规则。

	(1):paramName
	:paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。
	这个路径参数可以通过this.props.params.paramName取出。
	(2)()
	()表示URL的这个部分是可选的。
	(3)*
	*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
	(4)**
	** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

## IndexRoute组件
显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。<br/>
你可以把IndexRoute想象成某个路径的index.html。
## IndexLink组件
配合IndexRoute组件使用
## 清除URL上的#字母
## 使用服务器
## 表单跳转
	export default React.createClass({
	
	  // ask for `router` from context
	  contextTypes: {
	    router: React.PropTypes.object
	  },
	
	  // ...
	
	  handleSubmit(event) {
	    // ...
	    this.context.router.push(path);
	  },
	
	  // ..
	})
## 服务器渲染