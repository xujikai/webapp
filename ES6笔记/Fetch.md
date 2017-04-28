## POST请求

    fetch("http://www.example.org/submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "page=1&pageSize=10"
    }).then(function(res) {
      if (res.ok) {
        // doSth
      } else if (res.status == 401) {
        // doSth
      }
    });

fetch 会根据发送的数据自动设置相关的 Content-Type 的头。<br/>
req/res 的 body 只能被使用一次，如果想多次使用，需要先克隆一份。

## Headers 操作
添加Headers内容<br/>
方式一：

    var content = "Hello World";
    var reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "text/plain"
    reqHeaders.append("Content-Length", content.length.toString());
    reqHeaders.append("X-Custom-Header", "自定义头");

方式二：

    reqHeaders = new Headers({
      "Content-Type": "text/plain",
      "Content-Length": content.length.toString(),
      "X-Custom-Header": "自定义头",
    });

Headers相关操作

    reqHeaders.has("Content-Type"); // true
    reqHeaders.has("Set-Cookie"); // false
    reqHeaders.set("Content-Type", "text/html");
    reqHeaders.append("X-Custom-Header", "新增自定义头");

    reqHeaders.get("Content-Length"); // 11
    reqHeaders.getAll("X-Custom-Header"); // ["自定义头", "新增自定义头"]

    reqHeaders.delete("X-Custom-Header");
    reqHeaders.getAll("X-Custom-Header"); // []

## Request 操作

跨域请求，通过mode实现

    fetch('https://www.villainhr.com/cors-enabled/some.json',
        {mode: 'cors',credentials:'include'})
        .then(function(response) {
            return response.text();
        })

常用的 mode 属性值有:

- same-origin: 表示只请求同域. 如果你在该 mode 下进行的是跨域的请求的话, 那么就会报错.
- no-cors: 正常的网络请求, 主要应对于后台有没有设置 Access-Control-Allow-Origin. 换句话说, 就是用来处理 script, image 等的请求的. 他是 mode 的默认值.
- cors: 用来发送跨域的请求. 在发送请求时, 需要带上.
- cors-with-forced-preflight: 这是专门针对 XHR2 支持出来的 preflight，会事先多发一次请求给 server，检查该次请求的合法性。

关于cookie的跨域请求，在 XHR2 中，withCredentials这个属性就是设置在进行跨域请求时，对不同的Server是否发送本域的Cookie。
在 fetch 中, 使用的是 credentials 属性.

常用的 credentials 属性值有：

- omit: 发送请求时,不带上 cookie. 默认值.
- same-origin: 发送同域请求时,会带上 cookie.
- include: 只要发送请求,都会带上 cookie.

## Response 操作
Response 中比较常用的属性有四个: status, statusText, ok, type.
- status: 返回的状态码. 100~500+
- statusText: 返回状态码代表的含义. 比如, 返回"ok".
- ok: 用来检差 status 是否在200和299之间.
- type: 表示请求是否跨域, 或是否出错. 取值为: “basic”, “cors”, “default”, “error” 或
“opaque”.
