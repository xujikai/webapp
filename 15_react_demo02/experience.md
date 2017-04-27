## 问题思考
点击刷新，原来state中的数据是否存在。<br>


## react-router

#### > Link跳转传递参数

```
<Link to={{pathname:RouteUrl.HotVideoDetail,search:'?pos=111',state:{title:'xxx'}}}>
    {this.props.children}
</Link>
```

结果接收

    this.props.location.search  //?pos=111
    this.props.location.state   //{title:'xxx'}
