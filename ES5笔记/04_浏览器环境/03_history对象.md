## 概述
浏览器窗口有一个history对象，用来保存浏览历史。

如果当前窗口先后访问了三个网址，那么history对象就包括三项，history.length属性等于3。

history对象提供了一系列方法，允许在浏览历史之间移动。

- back()：移动到上一个访问页面，等同于浏览器的后退键。
- forward()：移动到下一个访问页面，等同于浏览器的前进键。
- go()：接受一个整数作为参数，移动到该整数指定的页面，
  比如go(1)相当于forward()，go(-1)相当于back()。

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败。

history.go(0)相当于刷新当前页面。

返回上一页代码

    document.getElementById('backLink').onclick = function () {
      window.history.back();
    }

注意，返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

## history.pushState()
HTML5为history对象添加了两个新方法，history.pushState()和history.replaceState()，
用来在浏览历史中添加和修改记录。

    if (!!(window.history && history.pushState)){
      // 支持History API
    } else {
      // 不支持
    }

上面代码可以用来检查，当前浏览器是否支持History API。
如果不支持的话，可以考虑使用Polyfill库History.js。

history.pushState方法接受三个参数，依次为：

- state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。
  如果不需要这个对象，此处可以填null。
- title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

假定当前网址是example.com/1.html，
我们使用pushState方法在浏览记录（history对象）中添加一个新记录。

    var stateObj = { foo: 'bar' };
    history.pushState(stateObj, 'page 2', '2.html');

添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，
但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。
假定这时你访问了google.com，然后点击了倒退按钮，页面的url将显示2.html，
但是内容还是原来的1.html。你再点击一次倒退按钮，url将显示1.html，内容不变。

总之，pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。

如果pushState的url参数，设置了一个新的锚点值（即hash），并不会触发hashchange事件。
如果设置了一个跨域网址，则会报错。

    // 报错
    history.pushState(null, null, 'https://twitter.com/hello');

上面代码中，pushState想要插入一个跨域的网址，导致报错。
这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。

## history.replaceState()
history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录。

假定当前网页是example.com/example.html。

    history.pushState({page: 1}, 'title 1', '?page=1');
    history.pushState({page: 2}, 'title 2', '?page=2');
    history.replaceState({page: 3}, 'title 3', '?page=3');

    history.back()
    // url显示为http://example.com/example.html?page=1

    history.back()
    // url显示为http://example.com/example.html

    history.go(2)
    // url显示为http://example.com/example.html?page=3

## history.state属性
history.state属性返回当前页面的state对象。

    history.pushState({page: 1}, 'title 1', '?page=1');

    history.state // { page: 1 }

## popstate事件
每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，
只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发。
另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象，
它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象（即这两个方法的第一个参数）。

    window.onpopstate = function (event) {
      console.log('location: ' + document.location);
      console.log('state: ' + JSON.stringify(event.state));
    };

    // 或者

    window.addEventListener('popstate', function(event) {
      console.log('location: ' + document.location);
      console.log('state: ' + JSON.stringify(event.state));
    });

上面代码中的event.state，就是通过pushState和replaceState方法，为当前URL绑定的state对象。

这个state对象也可以直接通过history对象读取。

    var currentState = history.state;

注意，页面第一次加载的时候，在load事件发生后，Chrome和Safari浏览器（Webkit核心）
会触发popstate事件，而Firefox和IE浏览器不会。

## URLSearchParams API
URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分。
没有部署这个API的浏览器，可以用url-search-params这个垫片库。

    var paramsString = 'q=URLUtils.searchParams&topic=api';
    var searchParams = new URLSearchParams(paramsString);

URLSearchParams有以下方法，用来操作某个参数。

- has()：返回一个布尔值，表示是否具有某个参数
- get()：返回指定参数的第一个值
- getAll()：返回一个数组，成员是指定参数的所有值
- set()：设置指定参数
- delete()：删除指定参数
- append()：在查询字符串之中，追加一个键值对
- toString()：返回整个查询字符串

示例代码

    var paramsString = 'q=URLUtils.searchParams&topic=api';
    var searchParams = new URLSearchParams(paramsString);

    searchParams.has('topic') // true
    searchParams.get('topic') // "api"
    searchParams.getAll('topic') // ["api"]

    searchParams.get('foo') // null，注意Firefox返回空字符串
    searchParams.set('foo', 2);
    searchParams.get('foo') // 2

    searchParams.append('topic', 'webdev');
    searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

    searchParams.append('foo', 3);
    searchParams.getAll('foo') // [2, 3]

    searchParams.delete('topic');
    searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"

URLSearchParams还有三个方法，用来遍历所有参数。

- keys()：遍历所有参数名
- values()：遍历所有参数值
- entries()：遍历所有参数的键值对

上面三个方法返回的都是Iterator对象。

    var searchParams = new URLSearchParams('key1=value1&key2=value2');

    for (var key of searchParams.keys()) {
      console.log(key);
    }
    // key1
    // key2

    for (var value of searchParams.values()) {
      console.log(value);
    }
    // value1
    // value2

    for (var pair of searchParams.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
    // key1, value1
    // key2, value2

下面是一个替换当前URL的例子。

    // URL: https://example.com?version=1.0
    var params = new URLSearchParams(location.search.slice(1));
    params.set('version', 2.0);

    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    // URL: https://example.com?version=2.0

URLSearchParams实例可以当作POST数据发送，所有数据都会URL编码。

    let params = new URLSearchParams();
    params.append('api_key', '1234567890');

    fetch('https://example.com/api', {
      method: 'POST',
      body: params
    }).then(...)

DOM的a元素节点的searchParams属性，就是一个URLSearchParams实例。

    var a = document.createElement('a');
    a.href = 'https://example.com?filter=api';
    a.searchParams.get('filter') // "api"

URLSearchParams还可以与URL接口结合使用。

    var url = new URL(location);
    var foo = url.searchParams.get('foo') || 'somedefault';

