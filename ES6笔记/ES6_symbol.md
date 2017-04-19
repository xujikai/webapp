## 概述
ES5的对象属性名都是字符串，容易造成属性名的冲突。
比如，引用他人提供的对象，但又想为该对象添加新的属性与方法。
Symbol就是保证每个属性名都是独一无二的。

Symbol是ES6引用的一种新的原始数据类型，表示独一无二的值。
原始数据类型：
- Undefined
- Null
- Boolean
- String
- Number
- Object
- Symbol

现在的属性名分为两种，一种是原来的字符串，另一种是新增的Symbol类型。

    let s = Symbol();

    typeof s
    // "symbol"

**注意：Symbol函数前不能使用new命令，否则会报错。
这是因为生成的Symbol是一个原始类型的值，不是对象。**

Symbol函数可以接受一个字符串或对象作为参数，表示对Symbol实例的描述，
主要是为了在控制台显示，比较容易区分。

    var s1 = Symbol('foo');
    var s2 = Symbol('bar');

    s1 // Symbol(foo)
    s2 // Symbol(bar)

    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"

    //如果是对象，就会调用对象的toString方法
    const obj = {
      toString() {
        return 'abc';
      }
    };
    const sym = Symbol(obj);
    sym // Symbol(abc)

**注意：Symbol函数的参数只是对当前Symbol值的描述，
因此相同参数的Symbol返回值是不相等的。**

    // 没有参数的情况
    var s1 = Symbol();
    var s2 = Symbol();

    s1 === s2 // false

    // 有参数的情况
    var s1 = Symbol('foo');
    var s2 = Symbol('foo');

    s1 === s2 // false

Symbol值不能与其他类型的值进行计算，会报错。
但是可以转为字符串和布尔值，不能转为数值。

    var sym = Symbol('My symbol');

    "your symbol is " + sym
    // TypeError: can't convert symbol to string
    `your symbol is ${sym}`
    // TypeError: can't convert symbol to string

## 作为属性名的Symbol

    var mySymbol = Symbol();

    // 第一种写法(最为常用)
    var a = {};
    a[mySymbol] = 'Hello!';

    // 第二种写法(继承对象时使用)
    var a = {
      [mySymbol]: 'Hello!'
    };

    // 第三种写法(自定义时使用)
    var a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });

    // 以上写法都得到同样结果
    a[mySymbol] // "Hello!"

使用示例一：<br/>
常量使用Symbol值的最大好处，就是其他任何值都不可能有相同的值了。
因此可以保证switch语句会按设计的方式工作。

    const COLOR_RED    = Symbol();
    const COLOR_GREEN  = Symbol();

    function getComplement(color) {
      switch (color) {
        case COLOR_RED:
          return COLOR_GREEN;
        case COLOR_GREEN:
          return COLOR_RED;
        default:
          throw new Error('Undefined color');
        }
    }

使用示例二：

    log.levels = {
      DEBUG: Symbol('debug'),
      INFO: Symbol('info'),
      WARN: Symbol('warn')
    };
    log(log.levels.DEBUG, 'debug message');
    log(log.levels.INFO, 'info message');

## 实例：消除魔术字符串
魔术字符串：在代码中多次出现、与代码形成强耦合的具体字符串或数值。

    var shapeType = {
      triangle: Symbol('Triangle')
    };

    function getArea(shape, options) {
      var area = 0;
      switch (shape) {
        case shapeType.triangle:
          area = .5 * options.width * options.height;
          break;
      }
      return area;
    }

    // 魔术字符串
    // getArea('Triangle', { width: 100, height: 100 });
    getArea(shapeType.triangle, { width: 100, height: 100 });

## 属性名的遍历
Symbol作为属性名，该属性不会出现在for...in和for...of循环中，
也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
但是，它可以通过Object.getOwnPropertySymbols()返回指定对象的所有Symbol属性名。
它不是私有属性。

由于以Symbol值作为名称的属性，不会被常规方法遍历得到。<br/>
我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

    var obj = {};

    var foo = Symbol("foo");

    // obj[foo] = "foobar";
    Object.defineProperty(obj, foo, {
      value: "foobar",
    });

    for (var i in obj) {
      console.log(i); // 无输出
    }

    Object.getOwnPropertyNames(obj)
    // []

    Object.getOwnPropertySymbols(obj)
    // [Symbol(foo)]

另一个新的API(暂未学习)<br/>
Reflect.ownKeys()可以返回所有类型的键名，包括字符串键名和Symbol键名。

    let obj = {
      [Symbol('my_key')]: 1,
      enum: 2,
      nonEnum: 3
    };

    Reflect.ownKeys(obj)
    //  ["enum", "nonEnum", Symbol(my_key)]

## Symbol.for()与Symbol.keyFor()
Symbol.for()：接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
如果有，就返回该Symbol值；如果没有，就新建该Symbol值并返回。

    var s1 = Symbol.for('foo');
    var s2 = Symbol.for('foo');

    s1 === s2 // true

##### > Symbol()与Symbol.for()的区别：
* Symbol()：每次调用都会返回一个新的值。
* Symbol.for()：会被登记在全局环境中供搜索。

Symbol.keyFor()：返回一个已登记的Symbol类型值的key。

    var s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    var s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined

上面代码中，变量s2属于未登记的Symbol值，所以返回undefined

## 实例：模块的单例模式

    // mod.js
    const FOO_KEY = Symbol.for('foo');

    function A() {
      this.foo = 'hello';
    }

    if (!global[FOO_KEY]) {
      global[FOO_KEY] = new A();
    }

    module.exports = global[FOO_KEY];

上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。

    var a = require('./mod.js');
    global[Symbol.for('foo')] = 123;

如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。

    // mod.js
    const FOO_KEY = Symbol('foo');

    // 后面代码相同 ……

上面代码将导致其他脚本都无法引用FOO_KEY。
但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。
虽然Node会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，
但是用户可以手动清除缓存，所以也不是完全可靠。

虽然会出现这种情况，但是如果这个值不改变的话，在引用的过程中，是不受影响的。