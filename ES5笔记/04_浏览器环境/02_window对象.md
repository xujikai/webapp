## 概述
在浏览器中，window对象（注意，w为小写）指当前的浏览器窗口。它也是所有对象的顶层对象。

“顶层对象”指的是最高一层的对象，所有其他对象都是它的下属。
JavaScript规定，浏览器环境的所有全局变量，都是window对象的属性。

## window对象的属性
#### > window.window，window.name

window对象的window属性指向自身。<br/>
window.name属性用于设置当前浏览器窗口的名字。

#### > window.location

window.location返回一个location对象，用于获取窗口当前的URL信息。
它等同于document.location对象，详见document对象。

#### > window.screenX，window.screenY
window.screenX和window.screenY属性，
返回浏览器窗口左上角相对于当前屏幕左上角（(0, 0)）的水平距离和垂直距离，单位为像素。

#### > window.innerHeight，window.innerWidth
window.innerHeight和window.innerWidth属性，
返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport），单位为像素。

当用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。
因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，
因为可见部分（视口）就变小了。

注意，这两个属性值包括滚动条的高度和宽度。

#### > window.outerHeight，window.outerWidth
window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，
包括浏览器菜单和边框，单位为像素。

#### > window.pageXOffset，window.pageYOffset
window.pageXOffset属性返回页面的水平滚动距离，
window.pageYOffset属性返回页面的垂直滚动距离，单位都为像素。

举例来说，如果用户向下拉动了垂直滚动条75像素，那么window.pageYOffset就是75。
用户水平向右拉动水平滚动条200像素，window.pageXOffset就是200。

## navigator对象
window对象的navigator属性，指向一个包含浏览器信息的对象。
#### > navigator.userAgent
navigator.userAgent属性返回浏览器的User-Agent字符串，标示浏览器的厂商和版本信息。

通过userAgent属性识别浏览器，不是一个好办法，但是，
通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。

    var ua = navigator.userAgent.toLowerCase();

    if (/mobi/i.test(ua)) {
      // 手机浏览器
    } else {
      // 非手机浏览器
    }

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

    /mobi|android|touch|mini/i.test(ua)

#### > navigator.plugins
navigator.plugins属性返回一个类似数组的对象，
成员是浏览器安装的插件，比如Flash、ActiveX等。

#### > navigator.platform
navigator.platform属性返回用户的操作系统信息。

    navigator.platform // "Linux x86_64"

#### > navigator.onLine
navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线。

#### > navigator.geolocation
navigator.geolocation返回一个Geolocation对象，包含用户地理位置的信息。

#### > navigator.javaEnabled()，navigator.cookieEnabled
javaEnabled方法返回一个布尔值，表示浏览器是否能运行Java Applet小程序。

    navigator.javaEnabled() // false

cookieEnabled属性返回一个布尔值，表示浏览器是否能储存Cookie。

    navigator.cookieEnabled // true

注意，这个返回值与是否储存某个网站的Cookie无关。
用户可以设置某个网站不得储存Cookie，这时cookieEnabled返回的还是true。

## window.screen对象
window.screen对象包含了显示设备的信息。

screen.height和screen.width两个属性，一般用来了解设备的分辨率。

    // 显示设备的高度，单位为像素
    screen.height // 1920

    // 显示设备的宽度，单位为像素
    screen.width // 1080

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。
显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码。

    if ((screen.width <= 800) && (screen.height <= 600)) {
      window.location.replace('small.html');
    } else {
      window.location.replace('wide.html');
    }

screen.availHeight和screen.availWidth属性返回屏幕可用的高度和宽度，单位为像素。
它们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

screen.colorDepth属性返回屏幕的颜色深度，一般为16（表示16-bit）或24（表示24-bit）。

## window对象的方法
#### > window.moveTo()，window.moveBy()
window.moveTo方法用于移动浏览器窗口到指定位置。
它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

    window.moveTo(100, 200)

window.moveBy方法将窗口移动到一个相对位置。它接受两个参数，
分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

    window.moveBy(25, 50)

#### > window.scrollTo()，window.scrollBy()
window.scrollTo方法用于将网页的指定位置，滚动到浏览器左上角。
它的参数是相对于整张网页的横坐标和纵坐标。它有一个别名window.scroll。

    window.scrollTo(0, 1000);

window.scrollBy方法用于将网页移动指定距离，单位为像素。
它接受两个参数：向右滚动的像素，向下滚动的像素。

    window.scrollBy(0, window.innerHeight)

#### > window.getSelection()
window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。

    var selObj = window.getSelection();

使用Selction对象的toString方法可以得到选中的文本。

    var selectedText = selObj.toString();

## 事件
window对象可以接收以下事件。

#### > load事件和onload属性
load事件发生在文档在浏览器窗口加载完毕时。
window.onload属性可以指定这个事件的回调函数。

    window.onload = function() {
      var elements = document.getElementsByClassName('example');
      for (var i = 0; i < elements.length; i++) {
        var elt = elements[i];
        // ...
      }
    };

#### > error事件和onerror属性
浏览器脚本发生错误时，会触发window对象的error事件。
我们可以通过window.onerror属性对该事件指定回调函数。

    window.onerror = function (message, filename, lineno, colno, error) {
      console.log("出错了！--> %s", error.stack);
    };

## URL的编码/解码方法
#### > encodeURI
encodeURI 方法的参数是一个字符串，代表整个URL。
它会将元字符和语义字符之外的字符，都进行转义。

    encodeURI('http://www.example.com/q=春节')
    // "http://www.example.com/q=%E6%98%A5%E8%8A%82"

#### > encodeURIComponent
encodeURIComponent只转除了语义字符之外的字符，元字符也会被转义。
因此，它的参数通常是URL的路径或参数值，而不是整个URL。

    encodeURIComponent('春节')
    // "%E6%98%A5%E8%8A%82"
    encodeURIComponent('http://www.example.com/q=春节')
    // "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"

#### > decodeURI
decodeURI用于还原转义后的URL。它是encodeURI方法的逆运算。

    decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
    // "http://www.example.com/q=春节"

#### > decodeURIComponent
decodeURIComponent用于还原转义后的URL片段。它是encodeURIComponent方法的逆运算。

    decodeURIComponent('%E6%98%A5%E8%8A%82')
    // "春节"




