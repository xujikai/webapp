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

## express

#### > 服务器渲染客户端打包后的页面

1. 将客户端打包后的文件，放入服务器端public静态目录里面
2. 将客户端打包后的index.html文件，放入服务器端views目录里面
3. 在服务器端api.js中，添加监听客户端请求路径，全部指向index.html中

## 使用三方类库(没有在package.json中配置的)

    src
    |--->lib
    |------->swiper(具体三方库名)
    |----------->swiper.min.css
    |----------->swiper.min.js

在CSS中导入css

    // 根据实际路径进行调整
    @import '../../../lib/swiper/swiper.min.css';

在JSX中导入js

    import SwiperAction from '../../../lib/swiper/swiper.min.js';

## meta标签

    H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />

    忽略将页面中的数字识别为电话号码
    <meta name="format-detection" content="telephone=no" />

    忽略Android平台中对邮箱地址的识别
    <meta name="format-detection" content="email=no" />

    当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <!-- ios7.0版本以后，safari上已看不到效果 -->
    将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- 可选default、black、black-translucent -->

    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">

    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">

    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">

    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">

    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">

    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
