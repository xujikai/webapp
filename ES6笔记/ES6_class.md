## class基本用法

#### > 概述
JS语言的传统方法是通过构造函数，定义并生成新的对象。

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
    };

    var p = new Point(1, 2);

上面这种写法跟传统的面向对象语言(C++和java)差异很大，很容易让人产生困惑。

ES6提供了更接近传统语言的方法，提供class这个概念，作为对象的模板。
通过class关键字，可以定义类。基本上，ES6的class可以看作是一个语法糖，
它的绝大多数功能，ES5都可以做到。新的class写法只是让对象原型的写法更加清晰、
更像面向对象编程的语法而已。

    //定义类
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }

上面代码定义了一个类，constructor方法就是构造函数，而this关键字代表实例对象。

ES6的类，完全可以看作是构造函数的另一种写法。

    class Point {
      // ...
    }

    typeof Point // "function"
    Point === Point.prototype.constructor // true

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。<br/>
使用的时候，也是使用new命令，跟构造函数的用法完全一致。

    class Bar {
      doStuff() {
        console.log('stuff');
      }
    }

    var b = new Bar();
    b.doStuff() // "stuff"

构造函数的prototype属性，在ES6的类中继续存在。
事实上，类的所有方法都定义在类的prototype属性上面。

    class Point {
      constructor(){
        // ...
      }

      toString(){
        // ...
      }

      toValue(){
        // ...
      }
    }

    // 等同于

    Point.prototype = {
      toString(){},
      toValue(){}
    };

在类的实例上调用方法，实际上就是调用原型上的方法。

    class B {}
    let b = new B();

    b.constructor === B.prototype.constructor // true

上面代码中，b是B的实例，它的constructor方法就是B类原型的constructor方法。

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
Object.assign方法可以很方便的一次性向类中添加多个方法。

    class Point {
      constructor(){
        // ...
      }
    }

    Object.assign(Point.prototype, {
      toString(){},
      toValue(){}
    });

prototype对象的constructor属性，直接指向类的本身，这与ES5的行为是一致的。

    Point.prototype.constructor === Point

另外，类的内部所有定义的方法，都是不可枚举的。

    class Point {
      constructor(x, y) {
        // ...
      }

      toString() {
        // ...
      }
    }

    Object.keys(Point.prototype) // []
    Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]

上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。
这一点与ES5的行为不一致。

    var Point = function (x, y) {
      // ...
    };

    Point.prototype.toString = function() {
      // ...
    };

    Object.keys(Point.prototype)
    // ["toString"]
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]

上面代码采用ES5的写法，toString方法就是可枚举的。

类的属性名，可以采用表达式。

    let methodName = "getArea";
    class Square{
      constructor(length) {
        // ...
      }

      [methodName]() {
        // ...
      }
    }

上面代码中，Square类的方法名getArea，是从表达式得到的。

#### > constructor方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
一个类必须有constructor方法，如果没有定义，一个空的constructor会被默认添加。

constructor方法默认返回实例对象(即this)，完全可以指定返回另外一个对象。

    class Foo {
      constructor() {
        return Object.create(null);
      }
    }

    new Foo() instanceof Foo // false

类的构造函数，不使用new命令是无法调用的，会报错。
这是它跟普通构造函数一个重要的区别，后者不用new也可以执行。

    class Foo {
      constructor() {
        return Object.create(null);
      }
    }

    Foo()
    // TypeError: Class constructor Foo cannot be invoked without 'new'

#### > 类的实例对象
生成类的实例对象的写法，与ES5完全一样，也是使用new命令。
与ES5一样，实例的属性除非显示定义在其本身(即定义在this对象上)，
否则都是定义在原型上(即定义在class上)。

    //定义类
    class Point {

      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }

    }

    var point = new Point(2, 3);

    point.toString() // (2, 3)

    point.hasOwnProperty('x') // true
    point.hasOwnProperty('y') // true
    point.hasOwnProperty('toString') // false
    point.__proto__.hasOwnProperty('toString') // true

上面代码中，x和y都是实例对象point自身的属性(因为定义在this变量上)，
所以hasOwnProperty方法都返回true，而toString是原型对象的属性(因为定义在Point类上)，
所以hasOwnProperty方法返回false，这些都与ES5行为一致。

与ES5一样，类的所有实例共享一个原型对象。

    var p1 = new Point(2,3);
    var p2 = new Point(3,2);

    p1.__proto__ === p2.__proto__ //true

上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype。

这也意味着，可以通过实例的__proto__属性为Class添加方法。但是这是不推荐的。

    var p1 = new Point(2,3);
    var p2 = new Point(3,2);

    p1.__proto__.printName = function () { return 'Oops' };

    p1.printName() // "Oops"
    p2.printName() // "Oops"

    var p3 = new Point(4,2);
    p3.printName() // "Oops"

#### > 不存在变量提升
class不存在变量提升，这一点与ES5完全不同。

    new Foo(); // ReferenceError
    class Foo {}

这种机制的原因与下面提到的继承有关。

    {
      let Foo = class {};
      class Bar extends Foo {
      }
    }

上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
但是，如果存在class的提升，上面的代码就会报错，因为class会被提升到代码头部，
而let不存在变量提升，所以导致Bar继承Foo的时候，Foo还没有定义。

#### > class表达式
与函数一样，类也可以使用表达式的形式定义。

    const MyClass = class Me {
      getClassName() {
        return Me.name;
      }
    };

上面代码使用表达式创建了一个类。需要注意的是，这个类的名字是MyClass而不是Me，
Me只在Class的内部代码可用，指代当前类。

    let inst = new MyClass();
    inst.getClassName() // Me
    Me.name // ReferenceError: Me is not defined

采用class表达式，可以写出立即执行的Class。

    let person = new class {
      constructor(name) {
        this.name = name;
      }

      sayName() {
        console.log(this.name);
      }
    }('张三');

    person.sayName(); // "张三"

#### > 私有方法
私有方法是常见方法，但ES6不提供，不过可以通过变通的方法实现。

一种做法是在命名上加以区别

    class Widget {

      // 公有方法
      foo (baz) {
        this._bar(baz);
      }

      // 私有方法
      _bar(baz) {
        return this.snaf = baz;
      }

      // ...
    }

上面代码中，这种命名方法是不保险的，外界依然可以通过命名访问到。

另一种做法就是将私有方法移出模块

    class Widget {
      foo (baz) {
        bar.call(this, baz);
      }

      // ...
    }

    function bar(baz) {
      return this.snaf = baz;
    }

上面代码中，foo是公有方法，内部调用了bar.call(this,baz)。
这使得bar实际上成为了当前模块的私有方法。

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

    const bar = Symbol('bar');
    const snaf = Symbol('snaf');

    export default class myClass{

      // 公有方法
      foo(baz) {
        this[bar](baz);
      }

      // 私有方法
      [bar](baz) {
        return this[snaf] = baz;
      }

      // ...
    };

上面代码中，bar和snaf都是Symbol值，导致第三方无法获取它们，因此达到了私有方法和私有属性的效果。

#### > this的指向
类的方法内部如果含有this，它默认指向类的实例。
但是，必须非常小心，一旦单独使用该方法，很可能报错。

    class Logger {
      printName(name = 'there') {
        this.print(`Hello ${name}`);
      }

      print(text) {
        console.log(text);
      }
    }

    const logger = new Logger();
    const { printName } = logger;
    printName(); // TypeError: Cannot read property 'print' of undefined

上面代码中，printName方法中的this，默认指向Logger类的实例。
但是，如果将这个方法提出来单独使用，this会指向该方法运行时所在的环境，
因为找不到print方法而报错。

一个比较简单的解决办法是，在构造方法中绑定this，这样就不会找不到print方法了。

    class Logger {
      constructor() {
        this.printName = this.printName.bind(this);
      }

      // ...
    }

另一种解决办法是使用箭头函数

    class Logger {
      constructor() {
        this.printName = (name = 'there') => {
          this.print(`Hello ${name}`);
        };
      }

      // ...
    }







