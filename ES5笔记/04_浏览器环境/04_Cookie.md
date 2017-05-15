## 概述
Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过4KB。
浏览器每次向服务器发出请求，就会自动附上这段信息。

Cookie 保存以下几方面的信息。

- Cookie的名字
- Cookie的值
- 到期时间
- 所属域名（默认是当前域名）
- 生效的路径（默认是当前网址）

举例来说，如果当前URL是 `www.example.com` ，那么Cookie的路径就是根目录/。
这意味着，这个Cookie对该域名的根路径和它的所有子路径都有效。
如果路径设为/forums，那么这个Cookie只有在访问 `www.example.com/forums` 及其子路径时才有效。

浏览器可以设置不接受 Cookie，也可以设置不向服务器发送 Cookie。
window.navigator.cookieEnabled属性返回一个布尔值，表示浏览器是否打开 Cookie 功能。

document.cookie属性返回当前网页的 Cookie。

    // 读取当前网页的所有cookie
    var allCookies = document.cookie;

由于document.cookie返回的是分号分隔的所有Cookie，所以必须手动还原，
才能取出每一个Cookie的值。

    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      // cookies[i] name=value形式的单个Cookie
    }

document.cookie属性是可写的，可以通过它为当前网站添加Cookie。

    document.cookie = 'fontSize=14';

Cookie的值必须写成key=value的形式。注意，等号两边不能有空格。
另外，写入Cookie的时候，必须对分号、逗号和空格进行转义（它们都不允许作为Cookie的值），
这可以用encodeURIComponent方法达到。

但是，document.cookie一次只能写入一个Cookie，而且写入并不是覆盖，而是添加。

    document.cookie = 'test1=hello';
    document.cookie = 'test2=world';
    document.cookie
    // test1=hello;test2=world

document.cookie属性读写行为的差异（一次可以读出全部Cookie，但是只能写入一个Cookie），
与服务器与浏览器之间的Cookie通信格式有关。浏览器向服务器发送Cookie的时候，是一行将所有Cookie全部发送。

    GET /sample_page.html HTTP/1.1
    Host: www.example.org
    Cookie: cookie_name1=cookie_value1; cookie_name2=cookie_value2
    Accept: */*

上面的头信息中，Cookie字段是浏览器向服务器发送的Cookie。

服务器告诉浏览器需要储存Cookie的时候，则是分行指定。

    HTTP/1.0 200 OK
    Content-type: text/html
    Set-Cookie: cookie_name1=cookie_value1
    Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 3567 06:23:41 GMT

上面的头信息中，Set-Cookie字段是服务器写入浏览器的Cookie，一行一个。

如果仔细看浏览器向服务器发送的Cookie，就会意识到，Cookie协议存在问题。
对于服务器来说，有两点是无法知道的。

1. Cookie的各种属性，比如何时过期。
2. 哪个域名设置的Cookie，因为Cookie可能是一级域名设的，也可能是任意一个二级域名设的。

## Cookie 的属性
除了Cookie本身的内容，还有一些可选的属性也是可以写入的，它们都必须以分号开头。

    Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]

上面的Set-Cookie字段，用分号分隔多个属性。它们的含义如下。








