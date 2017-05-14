## 概述
this关键字是一个非常重要的语法点。
this总是返回一个对象，简单说，就是返回属性或方法当前所在的对象。

    var person = {
      name: '张三',
      describe: function () {
        return '姓名：'+ this.name;
      }
    };

    person.describe() // "姓名：张三"

上面代码中，this.name表示describe方法所在的当前对象的name属性。
调用person.describe方法时，describe方法所在的当前对象是person，所以就调用person.name。

由于对象的属性可以赋值给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的。

    var A = {
      name: '张三',
      describe: function () {
        return '姓名：'+ this.name;
      }
    };

    var B = {
      name: '李四'
    };

    B.describe = A.describe;
    B.describe() // "姓名：李四"

上面代码中，A.describe方法被赋值给B，于是B.describe就表示describe方法所在的当前对象是B，
所以this.name就指向B.name。

稍稍重构这个例子，this的动态指向就会更加清楚

    function f() {
      return '姓名：'+ this.name;
    }

    var A = {
      name: '张三',
      describe: f
    };

    var B = {
      name: '李四',
      describe: f
    };

    A.describe() // "姓名：张三"
    B.describe() // "姓名：李四"

上面代码中，函数f内部使用了this关键字，随着f所在的对象不同，this的指向也不同。

只要函数被赋给另一个变量，this的指向就会变。

    var A = {
      name: '张三',
      describe: function () {
        return '姓名：'+ this.name;
      }
    };

    var name = '李四';
    var f = A.describe;
    f() // "姓名：李四"

上面代码中，A.describe被赋值给变量f，内部的this就会指向f运行时所在的对象。

## 使用场合
this的使用场合可以分为下面几种

#### > 全局环境
在全局环境使用this，它指的就是顶层对象window。

    this === window // true

    function f() {
      console.log(this === window); // true
    }

上面代码说明，不管是不是在函数内部，this都指向window。

#### > 构造函数
构造函数中的this，指的是实例对象。

    var Obj = function (p) {
      this.p = p;
    };

    Obj.prototype.m = function() {
      return this.p;
    };

上面代码定义了一个构造函数Obj，由于this指向实例对象，所以在构造函数内部定义this.p，
就相当于定义一个实例对象具有p属性，然后m方法可以返回这个p属性。

    var o = new Obj('Hello World!');

    o.p // "Hello World!"
    o.m() // "Hello World!"

#### > 对象的方法
当A对象的方法被赋予B对象，该方法中的this就从指向了A对象变成了指向B对象。
所以要特别小心，将某个对象的方法赋值给另一个对象，会改变this的指向。

    var obj ={
      foo: function () {
        console.log(this);
      }
    };

    obj.foo() // obj

上面代码中，obj.foo方法执行时，它内部的this指向obj。

但是，只有这一种用法，this指向obj。其他用法时，this都指向代码块当前所在对象。

    // 情况一
    (obj.foo = obj.foo)() // window

    // 情况二
    (false || obj.foo)() // window

    // 情况三
    (1, obj.foo)() // window

上面代码中，obj.foo先运算再执行，即使它的值根本没有变化，this也不再指向obj了。

可以这样理解，在JS引擎内部，obj和obj.foo存储在两个内存地址，简称M1和M2。
只有obj.foo()这样调用时，是从M1调用M2，因此this指向obj。
但是，上面三种情况，都是直接取出M2进行运算，然后就在全局环境执行运算结果(还是M2)，
因此，this指向全局环境。

上面三种情况等同于下面的代码

    // 情况一
    (obj.foo = function () {
      console.log(this);
    })()

    // 情况二
    (false || function () {
      console.log(this);
    })()

    // 情况三
    (1, function () {
      console.log(this);
    })()

同样的，如果某个方法位于多层对象的内部，这时为了简化书写，把该方法赋值给一个变量，
往往会得到意料之外的结果。

    var a = {
      b: {
        m: function() {
          console.log(this.p);
        },
        p: 'Hello'
      }
    };

    var hello = a.b.m;
    hello() // undefined

上面代码中，m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，结果调用时，this指向了顶层对象。
为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变。

    var hello = a.b;
    hello.m() // Hello

## 使用注意点

#### > 避免多层this
由于this的指向是不确定的，所以，切勿在函数中包含多层this。

    var o = {
      f1: function () {
        console.log(this);
        var f2 = function () {
          console.log(this);
        }();
      }
    }

    o.f1()
    // Object
    // Window

上面代码包含两层this，结果运行后，第一层指向该对象，第二层指向全局对象。<br/>
实际执行的是下面的代码。

    var temp = function () {
      console.log(this);
    };

    var o = {
      f1: function () {
        console.log(this);
        var f2 = temp();
      }
    }

一个解决方案是在第二层改用一个指向外层this的变量。

    var o = {
      f1: function() {
        console.log(this);
        var that = this;
        var f2 = function() {
          console.log(that);
        }();
      }
    }

    o.f1()
    // Object
    // Object

上面代码定义了变量that，固定指向外层this，然后在内层使用that，就不会发生this的指向改变。

事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，
有大量的应用，请务必掌握。

#### > 避免数组处理方法中的this
数组的map和foreach方法，允许提供一个函数作为参数，这个函数内部不应该使用this。

    var o = {
      v: 'hello',
      p: [ 'a1', 'a2' ],
      f: function f() {
        this.p.forEach(function (item) {
          console.log(this.v + ' ' + item);
        });
      }
    }

    o.f()
    // undefined a1
    // undefined a2

上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此，取不到o.v的值。
原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。

解决这个问题的一种方法，是使用中间变量

    var o = {
      v: 'hello',
      p: [ 'a1', 'a2' ],
      f: function f() {
        var that = this;
        this.p.forEach(function (item) {
          console.log(that.v+' '+item);
        });
      }
    }

    o.f()
    // hello a1
    // hello a2

另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境。

    var o = {
      v: 'hello',
      p: [ 'a1', 'a2' ],
      f: function f() {
        this.p.forEach(function (item) {
          console.log(this.v + ' ' + item);
        }, this);
      }
    }

    o.f()
    // hello a1
    // hello a2

#### > 避免回调函数中的this
回调函数中的this往往会改变指向，最好避免使用。

    var o = new Object();

    o.f = function () {
      console.log(this === o);
    }

    o.f() // true

上面代码表示，如果调用o对象的f方法，其中的this就是指向o对象。<br/>
但是，如果将f方法指定给某个按钮的click事件，this的指向就变了。

    $('#button').on('click', o.f);

点击按钮以后，控制台会显示false。原因是此时this不再指向o对象，而是指向按钮的DOM元素，
因为f方法是在按钮对象的环境中被调用的。这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。

为了解决这个问题，可以采用下面的一些方法对this进行绑定，也就是使得this固定指向某个对象，减少不确定性。

## 绑定this的方法
this的动态切换，固然为JS带来了巨大的灵活性，但也使得编程变得困难和模糊。
有时，需要把this固定下来，避免出现意想不到的情况。
JS提供了call、apply、bind这三种方法，来切换/固定this的指向。

#### > function.prototype.call()
函数实例的call方法，可以指定函数内部this的指向(即函数执行时所在的作用域)，
然后在所指定的作用域中，调用该函数。

    var obj = {};

    var f = function () {
      return this;
    };

    f() === this // true
    f.call(obj) === obj // true

上面代码中，在全局环境运行函数f时，this指向了全局环境；call方法可以改变this的指向，
指定this指向对象obj，然后在对象obj的作用域中运行函数f。

call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。

    var n = 123;
    var obj = { n: 456 };

    function a() {
      console.log(this.n);
    }

    a.call() // 123
    a.call(null) // 123
    a.call(undefined) // 123
    a.call(window) // 123
    a.call(obj) // 456

如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。

    var f = function () {
      return this;
    };

    f.call(5) // Number {[[PrimitiveValue]]: 5}

call方法还可以接受多个参数

    func.call(thisValue, arg1, arg2, ...)

第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。

    function add(a, b) {
      return a + b;
    }

    add.call(this, 1, 2) // 3

call方法的一个应用是调用对象的原生方法

    var obj = {};
    obj.hasOwnProperty('toString') // false

    // 覆盖掉继承的 hasOwnProperty 方法
    obj.hasOwnProperty = function () {
      return true;
    };
    obj.hasOwnProperty('toString') // true

    Object.prototype.hasOwnProperty.call(obj, 'toString') // false

上面代码中，hasOwnProperty是obj对象继承的方法，如果这个方法一旦被覆盖，
就不会得到正确的结果。call方法可以解决这个问题，它将hasOwnProperty方法的
原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果。

#### > function.prototype.apply()
apply方法的作用与call相似，也是改变this的指向，然后再调用该函数。
唯一的区别是，它接收一个数组作为函数执行时的参数。

    func.apply(thisValue, [arg1, arg2, ...])

使用示例

    function f(x,y){
      console.log(x+y);
    }

    f.call(null,1,1) // 2
    f.apply(null,[1,1]) // 2

上面的f函数本来接收两个参数，使用apply方法以后，就变成可以接受一个数组作为参数。
利用这一点，可以做一些有趣的应用。

##### >> 找出数组最大元素
JS不提供找出数组最大元素的函数。结合apply方法和Math.max方法，
就可以返回数组的最大元素。

    var a = [10, 2, 4, 15, 9];

    Math.max.apply(null, a) // 15

##### >> 将数组的空元素变为undefined
通过apply方法，利用Array构造函数将数组的空元素变成undefined。

    Array.apply(null, ["a",,"b"])
    // [ 'a', undefined, 'b' ]

空元素与undefined的差别在于，数组中的foreach方法会跳过空元素，但是不跳过undefined。
因此，遍历内部元素的时候，会得到不同的结果。

    var a = ['a', , 'b'];

    function print(i) {
      console.log(i);
    }

    a.forEach(print)
    // a
    // b

    Array.apply(null, a).forEach(print)
    // a
    // undefined
    // b

##### >> 转换类似数组的对象
利用数组对象的slice方法，可以将一个类似数组的对象转为真正的数组。

    Array.prototype.slice.apply({0:1,length:1})
    // [1]

    Array.prototype.slice.apply({0:1})
    // []

    Array.prototype.slice.apply({0:1,length:2})
    // [1, undefined]

    Array.prototype.slice.apply({length:1})
    // [undefined]

##### >> 绑定回调函数的对象

    var o = new Object();

    o.f = function () {
      console.log(this === o);
    }

    var f = function (){
      o.f.apply(o);
      // 或者 o.f.call(o);
    };

    $('#button').on('click', f);

点击按钮后，控制台会显示true。由于apply方法不仅绑定函数执行时所在的对象，
还会立即执行函数，因此不得不把绑定语句写在一个函数体内。

#### > function.prototype.bind()
bind方法用于将函数体内的this绑定到某个对象，然后返回一个新的函数。

    var d = new Date();
    d.getTime() // 1481869925657

    var print = d.getTime;
    print() // Uncaught TypeError: this is not a Date object.

使用bind方法解决该问题

    var print = d.getTime.bind(d);
    print() // 1481869925657

上面代码中，bind方法将getTime方法内部的this绑定到d对象，
这时就可以安全地将这个方法赋值给其他变量了。

bind比call方法和apply方法更进一步的是，除了绑定this以外，还可以绑定原函数的参数。

    var add = function (x, y) {
      return x * this.m + y * this.n;
    }

    var obj = {
      m: 2,
      n: 2
    };

    var newAdd = add.bind(obj, 5);

    newAdd(5)
    // 20

上面代码中，bind方法除了绑定this对象，还将add函数的第一个参数x绑定成5，
然后返回一个新的函数newAdd，这个函数只要再接收一个参数y就能运行了。

如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，
函数运行时this指向顶层对象。

    function add(x, y) {
      return x + y;
    }

    var plus5 = add.bind(null, 5);
    plus5(10) // 15

##### >> 每一次返回一个新函数
bind方法每运行一次，就返回一个新的函数，这会产生一些问题。
比如，监听事件的时候，不能写成下面这样：

    element.addEventListener('click', o.m.bind(o));

上面代码中，click事件绑定bind方法生成一个匿名函数。
这样，会导致无法取消绑定。所以，正确的写法应该是这样：

    var listener = o.m.bind(o);
    element.addEventListener('click', listener);
    //  ...
    element.removeEventListener('click', listener);

##### >> 结合回调函数使用
回调函数是JS最常用的模式之一，但是一个常见的错误是将包含this的方法直接当作回调函数。

    var counter = {
      count: 0,
      inc: function () {
        'use strict';
        this.count++;
      }
    };

    function callIt(callback) {
      callback();
    }

    callIt(counter.inc)
    // TypeError: Cannot read property 'count' of undefined

上面代码中，counter.inc方法被当作回调函数，传入callIt，调用时其内部的this
指向callIt运行时所在的对象，即顶层window，所以得不到预想结果。
注意，上面counter.inc方法内部使用了严格模式，在该模式下，this指向顶层对象时会报错，
一般模式下则不会。

解决方法就是使用bind方法，将counter.inc绑定counter

    callIt(counter.inc.bind(counter));
    counter.count // 1

还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。
这些函数内部的this指向，很可能也会出错。

    var obj = {
      name: '张三',
      times: [1, 2, 3],
      print: function () {
        this.times.forEach(function (n) {
          console.log(this.name);
        });
      }
    };

    obj.print()
    // 没有任何输出

上面代码中，obj.print内部this.times的this是指向obj的，这个没有问题。
但是forEach方法的回调函数内部的this.name却是指向全局对象，导致没有办法取到值。
稍微改动一下，就可以看的更清楚。

    obj.print = function () {
      this.times.forEach(function (n) {
        console.log(this === window);
      });
    };

    obj.print()
    // true
    // true
    // true

解决这个问题，也是通过bind方法绑定this。

    obj.print = function () {
      this.times.forEach(function (n) {
        console.log(this.name);
      }.bind(this));
    };

    obj.print()
    // 张三
    // 张三
    // 张三

##### >> 结合call方法使用(暂不理解)
利用bind方法，可以改写一些JS原生方法的使用形式，以数组的slice方法为例。

    [1, 2, 3].slice(0, 1) // [1]
    // 等同于
    Array.prototype.slice.call([1, 2, 3], 0, 1) // [1]



