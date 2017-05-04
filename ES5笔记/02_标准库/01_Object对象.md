## 概述
JS原生提供一个Object对象，所有其它对象都继承自这个对象。

注意：通过new Object()的写法生成新对象，与字面量的写法o = {}是等价的。

    var o1 = {a: 1};
    var o2 = new Object(o1);
    o1 === o2 // true

    new Object(123) instanceof Number // true

与其它构造函数一样，如果要在Object对象上面部署一个方法，有两种方法。

一. 部署在Object对象本身

    Object.print = function(o){ console.log(o) };

    var o = new Object();
    Object.print(o) // Object

二. 部署在Object.prototype上

所有构造函数都有一个prototype属性，指向一个原型对象。
凡是定义在Object.prototype对象上面的属性和方法，将被所有实例共享。

    Object.prototype.print = function(){ console.log(this)};

    var o = new Object();
    o.print() // Object

上面两种写法的print功能相同，但是用法是不一样的，
因此必须区分'构造函数的方法'和'实例对象的方法'。

## Object()
Object本身当作工具方法使用时，可以将任意值转为对象。
这个方法常用于保证某个值一定是对象。

如果Object方法的参数是一个对象，它总是返回原对象。
利用这一点，可以写一个判断变量是否为对象的函数。

    function isObject(value) {
      return value === Object(value);
    }

    isObject([]) // true
    isObject(true) // false

## Object对象的静态方法
所谓静态方法，是部署在Object对象自身的方法。

Object.keys()和Object.getOwnPropertyNames()很相似，一般用来遍历对象的属性。
它们的参数都是一个对象，都返回一个数组，该数组的成员都是自身的属性(没有继承的)。

Object.keys方法只返回可枚举的属性。
Object.getOwnPropertyNames方法还返回不可枚举的属性名。

    var a = ["Hello", "World"];

    Object.keys(a) // ["0", "1"]
    Object.getOwnPropertyNames(a) // ["0", "1", "length"]

## Object对象的实例方法
除了Object对象的本身的方法，还有不少方法是部署在Object.prototype对象上的，
所有Object的实例对象都继承了这些方法。

Object实例对象的方法，主要有以下六个
- valueOf()：返回当前对象对应的值
- toString()：返回当前对象对应的字符串形式
- toLocalString()：返回当前对象对应的本地字符串形式
- hasOwnProperty()：判断某个属性是当前实例的属性还是继承自原型对象的属性
- isPrototypeOf()：判断当前对象是否为另一个对象的原型
- propertyIsEnumerable()：判断某个属性是否可以枚举

#### > Object.prototype.valueOf()
valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

valueOf方法的主要用途是，JS自动类型转换时会默认调用这个方法

    var o = new Object();
    1 + o // "1[object Object]"

    o.valueOf = function (){
      return 2;
    };
    1 + o // 3

#### > Object.prototype.toString()
toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

    var o = new Object();
    o.toString() // "[object Object]"

    o.toString = function () {
      return 'hello';
    };
    o + ' ' + 'world' // "hello world"

数组、字符串、函数、Date对象都分别部署了自己版本的toString方法，
覆盖了Object.prototype.toString方法。

    [1, 2, 3].toString() // "1,2,3"

    '123'.toString() // "123"

    (function () {
      return 123;
    }).toString()
    // "function () {
    //   return 123;
    // }"

    (new Date()).toString() // "Tue May 10 2016 09:11:31 GMT+0800 (CST)"

##### >> 应用：判断数据类型
不同数据类型的Object.prototype.toString方法返回值如下

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error对象：返回[object Error]。
- Date对象：返回[object Date]。
- RegExp对象：返回[object RegExp]。
- 其他对象：返回[object Object]。

利用这个特性，可以写出更加准确的类型判断

    var type = function (o){
      var s = Object.prototype.toString.call(o);
      return s.match(/\[object (.*?)\]/)[1].toLowerCase();
    };

    type({}); // "object"
    type([]); // "array"
    type(5); // "number"
    type(null); // "null"
    type(); // "undefined"
    type(/abcd/); // "regex"
    type(new Date()); // "date"


