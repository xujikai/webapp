##HTML 模板
	<!DOCTYPE html>
	<html>
	  <head>
	    <script src="../build/react.js"></script>
	    <script src="../build/react-dom.js"></script>
	    <script src="../build/browser.min.js"></script>
	  </head>
	  <body>
	    <div id="example"></div>
	    <script type="text/babel">
	      // ** Our code goes here! **
	    </script>
	  </body>
	</html>

---

	注意一：最后一个 <script> 标签的 type 属性为 text/babel 。
	这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/babel"

	注意二：上面代码一共用了三个库： react.js 、react-dom.js 和 Browser.js ，它们必须首先加载。
	其中，react.js 是 React 的核心库，react-dom.js 是提供与 DOM 相关的功能，
	Browser.js 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

##ReactDOM.render()
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

	ReactDOM.render(
	  <h1>Hello, world!</h1>,
	  document.getElementById('example')
	);

##JSX 语法
	遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。
	JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

	const arr = [
	  <h1>Hello world!</h1>,
	  <h2>React is awesome</h2>,
	];
	ReactDOM.render(
	  <div>{arr}</div>,
	  document.getElementById('example')
	);

##组件
1. 组件类的第一个字母必须大写，否则会报错。
2. 组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。
3. 添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。
4. this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。

		const HelloMessage = React.createClass({
		  render() {
		    return <h1>Hello {this.props.name}</h1>;
		  }
		});
		
		ReactDOM.render(
		  <HelloMessage name="John" />,
		  document.getElementById('example')
		);

###> 注意
	this.props.children 的值有三种可能：
		如果当前组件没有子节点，它就是 undefined ;
		如果有一个子节点，数据类型是 object ；
		如果有多个子节点，数据类型就是 array 。

	React 提供一个工具方法 React.Children 来处理 this.props.children 。
	我们可以用 React.Children.map 来遍历子节点，
	而不用担心 this.props.children 的数据类型是 undefined 还是 object。

---

	const NotesList = React.createClass({
	  render() {
	    return (
	      <ol>
	      {
	        React.Children.map(this.props.children, function (child) {
	          return <li>{child}</li>;
	        })
	      }
	      </ol>
	    );
	  }
	});
	
	ReactDOM.render(
	  <NotesList>
	    <span>hello</span>
	    <span>world</span>
	  </NotesList>,
	  document.body
	);

##PropTypes
组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。
PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。

	const MyTitle = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	  },
	
	  render() {
	     return <h1> {this.props.title} </h1>;
	   }
	});

getDefaultProps 方法可以用来设置组件属性的默认值。

	const MyTitle = React.createClass({
	  getDefaultProps() {
	    return {
	      title : 'Hello World'
	    };
	  },
	
	  render() {
	     return <h1> {this.props.title} </h1>;
	   }
	});

##获取真实的DOM节点
文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。

	const MyComponent = React.createClass({
	  handleClick() {
	    this.refs['myTextInput'].focus();
	  },
	  render() {
	    return (
	      <div>
	        <input type="text" ref="myTextInput" />
	        <input type="button" value="Focus the text input" onClick={this.handleClick} />
	      </div>
	    );
	  }
	});

##this.state
React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI。
getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。
当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

	const LikeButton = React.createClass({
	  getInitialState() {
	    return {liked: false};
	  },
	  handleClick(event) {
	    this.setState({liked: !this.state.liked});
	  },
	  render() {
	    const text = this.state.liked ? 'like' : 'haven\'t liked';
	    return (
	      <p onClick={this.handleClick}>
	        You {text} this. Click to toggle.
	      </p>
	    );
	  }
	});

##组件的生命周期
组件的生命周期分成三个状态：

	* Mounting：已插入真实 DOM
	* Updating：正在被重新渲染
	* Unmounting：已移出真实 DOM
	
React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

	componentWillMount()
	componentDidMount()
	componentWillUpdate(object nextProps, object nextState)
	componentDidUpdate(object prevProps, object prevState)
	componentWillUnmount()

##综合示例

	var RepoList = React.createClass({
	  getInitialState() {
	    return { loading: true, error: null, data: null};
	  },
	
	  componentDidMount() {
	    this.props.promise.then(
	      value => this.setState({loading: false, data: value}),
	      error => this.setState({loading: false, error: error}));
	  },
	
	  render() {
	    if (this.state.loading) {
	      return <span>Loading...</span>;
	    }
	    else if (this.state.error !== null) {
	      return <span>Error: {this.state.error.message}</span>;
	    }
	    else {
	      var repos = this.state.data.items;
	      var repoList = repos.map(function (repo) {
	        return (
	          <li>
	            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
	          </li>
	        );
	      });
	      return (
	        <main>
	          <h1>Most Popular JavaScript Projects in Github</h1>
	          <ol>{repoList}</ol>
	        </main>
	      );
	    }
	  }
	});

	ReactDOM.render(
	  <RepoList
	    promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
	  />,
	  document.body
	);