## 概述
#### > 构造函数的缺点
JS通过构造函数生成新的对象，因此构造函数可以视为对象的模板。
实例对象的属性和方法，可以定义在构造函数内部。

    function Cat (name, color) {
      this.name = name;
      this.color = color;
    }

    var cat1 = new Cat('大毛', '白色');

    cat1.name // '大毛'
    cat1.color // '白色'

上面代码的Cat函数是一个构造函数，函数内部定义了name属性和color属性，
所有实例对象都会生成这两个属性。但是，这样做是对系统资源的浪费，
因为同一个构造函数的对象实例之间，无法共享属性。

    function Cat(name, color) {
      this.name = name;
      this.color = color;
      this.meow = function () {
        console.log('mew, mew, mew...');
      };
    }

    var cat1 = new Cat('大毛', '白色');
    var cat2 = new Cat('二毛', '黑色');

    cat1.meow === cat2.meow // false

上面代码中，cat1和cat2是同一个构造函数的实例。但是，它们的meow方法是不一样的，
就是说，每新建一个实例，就会新建一个meow方法。这既没有必要，又浪费系统资源，
因为所有的meow方法都是同样的行为，完全应该共享。

#### > prototype属性的作用
JS每个对象都继承另一个对象，后者称为原型(prototype)对象。
只有null除外，它没有自己的原型对象。

原型对象上的所有属性和方法，都能被派生对象共享。这就是JS继承机制的基本设计。

通过构造函数生成实例对象时，会自动为实例对象分配原型对象。
每一个构造函数都有一个prototype属性，这个属性就是实例对象的原型对象。

    function Animal (name) {
      this.name = name;
    }

    Animal.prototype.color = 'white';

    var cat1 = new Animal('大毛');
    var cat2 = new Animal('二毛');

    cat1.color // 'white'
    cat2.color // 'white'

上面代码中，构造函数Animal的prototype对象，就是实例对象cat1和cat2的原型对象。
在原型对象上添加color属性，结果，实例对象都能读取该属性。

原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。

    Animal.prototype.color = 'yellow';

    cat1.color // "yellow"
    cat2.color // "yellow"

上面代码中，原型对象的color属性的值变为yellow，两个实例对象的color属性立刻跟着变了。
这是因为，实例对象其实没有color属性，都是读取原型对象的color属性。也就是说，
当实例对象本身没有某个属性或方法时，它会到构造函数中prototype属性指向的对象，
去寻找该属性或方法。这就是原型对象的特殊之处。

如果实例对象存在某个属性或方法时，它就不会再去原型对象上去寻找。

总结：原型对象的作用，就是定义实例之间共享的属性和方法。
这也是它被称为原型对象的含义，而实例对象可以视作从原型对象衍生出来的子对象。

    Animal.prototype.walk = function () {
      console.log(this.name + ' is walking');
    };

上面代码中，Animal.prototype对象上面定义了一个walk方法，这个方法将可以在所有
Animal实例对象上调用。

由于JS所有的所有对象都有构造函数，而所有的构造函数都有prototype属性
(其实是所有函数都有prototype属性)，所以所有对象都有自己的原型对象。

#### > 原型链
对象的属性和方法，有可能是定义在自身，也有可能是定义在它的原型对象上。
由于原型对象也是对象，也有自己的原型，所以形成了一条原型链。比如，
a对象是b对象的原型，b对象是c对象的原型，以此类推。

如果一层层的上溯，所有对象的原型最终都可以上溯到Object.prototype，
即Object构造函数的prototype属性指向的那个对象。那么，Object.prototype对象
有没有它的原型呢？回答可以是有的，就是没有任何属性和方法的null对象，
而null对象没有自己的原型。

    Object.getPrototypeOf(Object.prototype) // null

上面代码表示，Object.prototype对象的原型是null，由于null没有任何属性，
所以原型链到此为止。

原型链的作用是，读取对象的某个属性时，JS先寻找对象本身的属性，如果找不到，
就到它的原型上去找，如果还是找不到，就到原型的原型上去找，如果直到最顶层的
Object.prototype还是找不到，就返回undefined。

需要注意的是，一级级向上，在原型链寻找某个属性，对性能是有影响的。
所寻找的属性在越上层的原型对象上，对性能的影响越大。
如果寻找一个不存在的属性，将会遍历整个原型链。

举例来说，如果让某个函数的prototype属性指向一个数组，就意味着该函数可以当作数组的构造函数，
因为，它生成的实例，都可以通过prototype属性调用数组方法。

    var MyArray = function () {};

    MyArray.prototype = new Array();
    MyArray.prototype.constructor = MyArray;

    var mine = new MyArray();
    mine.push(1, 2, 3);

    mine.length // 3
    mine instanceof Array // true

#### > constructor属性(未完成)
prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。

    function P() {}

    P.prototype.constructor === P // true

由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。

    function P() {}
    var p = new P();

    p.constructor // function P() {}

    p.constructor === P.prototype.constructor // true

    p.hasOwnProperty('constructor') // false

上面代码中，p是构造函数P的实例对象，但是p没有constructor属性，
该属性其实是读取原型链上面的P.prototype.constructor属性。

constructor属性的作用，是分辨原型对象到底属于哪个构造函数。

    function F() {};
    var f = new F();

    f.constructor === F // true
    f.constructor === RegExp // false

上面代码表示，使用constructor属性，确定实例对象f的构造函数是F，而不是RegExp。

有了constructor属性，就可以从实例新建另一个实例。

    function Constr() {}
    var x = new Constr();

    var y = new x.constructor();
    y instanceof Constr // true

上面代码中，x是构造函数Constr的实例，可以从x.constructor间接调用构造函数。

## instanceof运算符
instanceof运算符返回一个布尔值，表示指定对象是否为某个构造函数的实例。

    var v = new Vehicle();
    v instanceof Vehicle // true

上面代码中，对象v是构造函数Vehicle的实例，所以返回true。

instanceof运算符的左边是实例对象，右边是构造函数。
它的运算实质是检测右边构建函数的原型对象是否在左边对象的原型链上。

    v instanceof Vehicle
    // 等同于
    Vehicle.prototype.isPrototypeOf(v)

由于instanceof对整个原型链上的对象都有效，因此同一个实例对象，
可能会对多个构造函数都返回true。

    var d = new Date();
    d instanceof Date // true
    d instanceof Object // true

上面代码中，d同时是Date和Object的实例，因此对这两个构造函数都返回true。
instanceof的原理是检查原型链，对于那些不存在原型链的对象，就无法判断。

    Object.create(null) instanceof Object // false

上面代码中，Object.create(null)返回的新对象的原型是null，即不存在原型。
因此，instanceof就认为该对象不是Object的实例。

除了上面这种继承null的特殊情况，在JS中，只要是对象，就有对应的构造函数，
因此，instanceof运算符的一个用处，是判断值的类型。

    var x = [1, 2, 3];
    var y = {};
    x instanceof Array // true
    y instanceof Object // true

上面代码中，instanceof运算符判断，变量x是数组，变量y是对象。

#### > 注意
instaceof运算符只适用于对象，不适合原始类型的值。

    var s = 'hello';
    s instanceof String // false

上面代码中，字符串不是String对象的实例(因为字符串不是对象)，所以返回false。<br/>
此外，undefined和null不是对象，所以instanceof运算符总是返回false。

    undefined instanceof Object // false
    null instanceof Object // false

利用instaceof运算符，可以巧妙解决，调用构造函数时，忘加new命令的情况。

    function Fubar (foo, bar) {
      if (this instanceof Fubar) {
        this._foo = foo;
        this._bar = bar;
      } else {
        return new Fubar(foo, bar);
      }
    }

## Object.getPrototypeOf()
Object.getPrototypeOf()返回一个对象的原型，这是获取原型对象的标准方法。

    // 空对象的原型是Object.prototype
    Object.getPrototypeOf({}) === Object.prototype
    // true

    // 函数的原型是Function.prototype
    function f() {}
    Object.getPrototypeOf(f) === Function.prototype
    // true

    // f 为 F 的实例对象，则 f 的原型是 F.prototype
    var f = new F();
    Object.getPrototypeOf(f) === F.prototype
    // true

## Object.setPrototypeOf()
Object.setPrototypeOf()可以为现有对象设置原型，返回一个新对象。
它接收两个参数，第一个是现有对象，第二个是原型对象。

    var a = {x: 1};
    var b = Object.setPrototypeOf({}, a);
    // 等同于
    // var b = {__proto__: a};

    b.x // 1

上面代码中，b对象是Object.setPrototypeof方法返回的一个新对象。
该对象本身为空，原型为a对象，所以b对象可以拿到a对象的所有属性和方法。
b对象本身没有x属性，但是JS引擎找到它的原型对象a，然后读取a的x属性。

new命令通过构造函数新建实例对象，实质上就是将对象的原型指向构造函数的prototype属性，
然后在实例对象上执行构造函数。

    var F = function () {
      this.foo = 'bar';
    };

    var f = new F();
    // 等同于
    var f = Object.setPrototypeOf({}, F.prototype);
    F.call(f);

## Object.create()
Object.create()方法用于从原型对象生成新的实例对象，可以替代new命令。
它接收一个对象作为参数，返回一个新对象，后者完全继承前者的属性，即原有对象成为新对象的原型。

    var A = {
     print: function () {
       console.log('hello');
     }
    };

    var B = Object.create(A);

    B.print() // hello
    B.print === A.print // true

上面代码中，Object.create方法在A的基础上生成了B。此时，A就成了B的原型，
B就继承了A的所有属性和方法。这段代码等同于下面的代码。

    var A = function () {};
    A.prototype = {
     print: function () {
       console.log('hello');
     }
    };

    var B = new A();

    B.print === A.prototype.print // true

下面生成三种对象的方式是等价的

    var o1 = Object.create({});
    var o2 = Object.create(Object.prototype);
    var o3 = new Object();

如果想要一个不继承任何属性(比如没有toString方法和value方法)的对象，
可以将Object.create的参数设为null。

    var o = Object.create(null);

    o.valueOf() // TypeError: Object [object Object] has no method 'valueOf'

上面代码表示，如果对象o的原型是null，它就不具备一些定义在Object.prototype对象
上面的属性，比如valueOf方法。

使用Object.create方法的时候，必须提供对象的原型，否则会报错。

    Object.create() // TypeError: Object prototype may only be an Object or null

Object.create方法生成的新对象，动态继承了原型。在原型上添加和修改任何方法，
会立刻反映在新对象之上。

    var o1 = { p: 1 };
    var o2 = Object.create(o1);

    o1.p = 2;
    o2.p // 2

除了对象的原型，Object.create方法还可以接收第二个参数。该参数是一个属性描述符，
它所描述的对象属性，会添加到新对象上。

    var o = Object.create({}, {
      p1: {
        value: 123,
        enumerable: true,
        configurable: true,
        writable: true,
      },
      p2: {
        value: 'abc',
        enumerable: true,
        configurable: true,
        writable: true,
      }
    });

    // 等同于
    var o = Object.create({});
    o.p1 = 123;
    o.p2 = 'abc';

Object.create方法生成的对象，继承了它的原型对象的构造函数。

    function A() {}
    var a = new A();
    var b = Object.create(a);

    b.constructor === A // true
    b instanceof A // true

## Object.prototype.isPrototypeOf()
对象实例的isPrototypeOf方法，用来判断一个对象是否是另一个对象的原型。

    var o1 = {};
    var o2 = Object.create(o1);
    var o3 = Object.create(o2);

    o2.isPrototypeOf(o3) // true
    o1.isPrototypeOf(o3) // true

上面代码表明，只要某个对象处在原型链上，isPrototypeOf都返回true。

    Object.prototype.isPrototypeOf({}) // true
    Object.prototype.isPrototypeOf([]) // true
    Object.prototype.isPrototypeOf(/xyz/) // true
    Object.prototype.isPrototypeOf(Object.create(null)) // false

上面代码中，由于Object.prototype处于原型链的最顶端，所以对各种实例，都返回true，
只有继承null的对象除外。





