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

#### > name属性
由于本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的很多特性都被class继承，
包括name属性。

    class Point {}
    Point.name // "Point"

    // 这个行为与ES5的行为不一致，ES5会返回""
    const Point = class {
    	print(){
    		console.log('print');
    	}
    }
    Point.name // "Point"

    const Point = class Me{
        print(){
            console.log('print');
        }
    }
    Point.name // "Me"

## Class的继承
#### > 基本用法
class之间可以通过extends关键字实现继承，这比ES5修改原型链要简单的多。

    class ColorPoint extends Point {
      constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }

      toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
      }
    }

上面代码中，constructor方法和toString方法之中，都出现了super关键字，
它在这里表示调用父类的方法。

子类必须在constructor方法中调用super方法，否则新建实例时会报错。
这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其加工。
如果不掉用super方法，子类就得不到this对象。

    class Point { /* ... */ }

    class ColorPoint extends Point {
      constructor() {
      }
    }

    let cp = new ColorPoint(); // ReferenceError

ES5的继承，实质是先创建子类的实例对象this，然后再将父类的方法添加到this上面。
ES6的继承则完全不同，实质是先创建父类的实例对象this，然后再用子类的构造函数修改this。

如果子类没有定义constructor方法，这个方法会被默认添加。

    constructor(...args) {
      super(...args);
    }

另一个需要注意的地方是，在子类构造函数中，只有调用super之后，才可以使用this关键字。
这是因为子类的实例构建，是基于对父类的实例加工，只有super方法才能返回父类的实例。

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    class ColorPoint extends Point {
      constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
      }
    }

下面是生成实例的代码

    let cp = new ColorPoint(25, 8, 'green');

    cp instanceof ColorPoint // true
    cp instanceof Point // true

上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致。

#### > Object.getPrototypeOf()
Object.getPrototypeOf方法可以通过子类获取父类。

    Object.getPrototypeOf(ColorPoint) === Point

因此，可以通过这个方法，判断一个类是否继承了另一个类。

#### > super关键字
super这个关键字，既可以当作函数使用，也可以当作对象使用。
在这两种情况下，它的用法完全不同。

##### >> 当作函数使用
super当作函数使用时，代表父类的构造函数。ES6规定，
子类的构造函数必须执行一次super函数。

    class A {}

    class B extends A {
      constructor() {
        super();
      }
    }

上面代码中，子类B的构造函数之中的super方法，代表着调用父类的构造函数。
这是必须的，否则JS引擎会报错。

注意，super虽然代表了父类的A的构造函数，但是返回的是B的实例，即super内部的this指向的是B。
因此super()在这里相当于A.prototype.constructor.call(this)。

    class A {
      constructor() {
        console.log(new.target.name);
      }
    }
    class B extends A {
      constructor() {
        super();
      }
    }
    new A() // A
    new B() // B

上面代码中，new.target指向当前正在执行的函数。可以看到，在super()执行时，
它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super内部的this指向的是B。

作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

    class A {}

    class B extends A {
      m() {
        super(); // 报错
      }
    }

##### >> 当作对象使用
super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

    class A {
      p() {
        return 2;
      }
    }

    class B extends A {
      constructor() {
        super();
        console.log(super.p()); // 2
      }
    }

    let b = new B();

上面代码中，子类B当中的super.p()，就是将super当作对象使用。这时，super在普通方法之中，
指向A.prototype，所以super.p()就相当于A.prototype.p()。

这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法和属性，
是无法通过super调用的。

    class A {
      constructor() {
        this.p = 2;
      }
    }

    class B extends A {
      get m() {
        return super.p;
      }
    }

    let b = new B();
    b.m // undefined

上面代码中，p是父类A实例的属性，super.p就不能引用它。

如果属性定义在父类的原型对象上，super就可以取到。

    class A {}
    A.prototype.x = 2;

    class B extends A {
      constructor() {
        super();
        console.log(super.x) // 2
      }
    }

    let b = new B();

上面代码中，属性x是定义在A.prototype上面的，所以，super.x可以取到值。

ES6规定，通过super调用父类的方法时，super会绑定子类的this。

    class A {
      constructor() {
        this.x = 1;
      }
      print() {
        console.log(this.x);
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }
      m() {
        super.print();
      }
    }

    let b = new B();
    b.m() // 2

上面代码中，super.print()虽然会调用A.prototype.print()，但是，
A.prototype.print()会绑定子类B的this，导致输出的是2，不是1。
实际上执行的是super.print.call(this);

由于绑定子类的this，所以如果通过super对某个属性取值，这时super就是this。
赋值的属性会变成子类实例的属性。

    class A {
      constructor() {
        this.x = 1;
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
      }
    }

    let b = new B();

上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。
而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

如果super作为对象，用在静态方法中，这是super指向父类，而不是父类的原型对象。

    class Parent {
      static myMethod(msg) {
        console.log('static', msg);
      }

      myMethod(msg) {
        console.log('instance', msg);
      }
    }

    class Child extends Parent {
      static myMethod(msg) {
        super.myMethod(msg);
      }

      myMethod(msg) {
        super.myMethod(msg);
      }
    }

    Child.myMethod(1); // static 1

    var child = new Child();
    child.myMethod(2); // instance 2

上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

由于对象总是继承其它对象的，所以可以在任意一个对象中，使用super关键字。

    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };

    obj.toString(); // MyObject: [object Object]

## 原生构造函数的继承
原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ES原生构造函数有：

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生函数是无法被继承的，比如，不能自己定义一个Array的子类。

    function MyArray() {
      Array.apply(this, arguments);
    }

    MyArray.prototype = Object.create(Array.prototype, {
      constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
      }
    });

上面代码定义了一个继承Array的MyArray类。但是，这个类的行为与Array完全不一致。

    var colors = new MyArray();
    colors[0] = "red";
    colors.length  // 0

    colors.length = 0;
    colors[0]  // "red"

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()
或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，
原生构造函数的this无法绑定，导致拿不到内部属性。

ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，
导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性`[[DefineOwnProperty]]`，
用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，
然后再用子类的构造函数修饰this，使得父类的所有行为都可以被继承。

    class MyArray extends Array {
      constructor(...args) {
        super(...args);
      }
    }

    var arr = new MyArray();
    arr[0] = 12;
    arr.length // 1

    arr.length = 0;
    arr[0] // undefined

上面这个例子也说明，extends关键字不仅可以继承类，也可以继承原生的构造函数。
因此可以在原生数据结构的基础上，定义自己的数据结构。

    class VersionedArray extends Array {
      constructor() {
        super();
        this.history = [[]];
      }
      commit() {
        this.history.push(this.slice());
      }
      revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
      }
    }

    var x = new VersionedArray();

    x.push(1);
    x.push(2);
    x // [1, 2]
    x.history // [[]]

    x.commit();
    x.history // [[], [1, 2]]
    x.push(3);
    x // [1, 2, 3]

    x.revert();
    x // [1, 2]

注意，继承Object的子类，有一个行为差异

    class NewObj extends Object{
      constructor(){
        super(...arguments);
      }
    }
    var o = new NewObj({attr: true});
    console.log(o.attr === true);  // false

上面代码中，NewObj继承Object，但是无法通过super方法向父类Object传参。
这是因为ES6改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()
这种形式调用的，ES6规定Object构造函数会忽略参数。

## Class的取值函数(getter)和存值函数(setter)
与ES5一样，在class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，
拦截该属性的存取行为。

    class MyClass {
      constructor() {
        // ...
      }
      get prop() {
        return 'getter';
      }
      set prop(value) {
        console.log('setter: '+value);
      }
    }

    let inst = new MyClass();
    inst.prop = 123; // setter: 123
    inst.prop // 'getter'

存值函数和取值函数是设置在属性的descriptor对象上的。

    class CustomHTMLElement {
      constructor(element) {
        this.element = element;
      }

      get html() {
        return this.element.innerHTML;
      }

      set html(value) {
        this.element.innerHTML = value;
      }
    }

    var descriptor = Object.getOwnPropertyDescriptor(
      CustomHTMLElement.prototype, "html");
    "get" in descriptor  // true
    "set" in descriptor  // true

上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与ES5完全一致。

## Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，
而是直接通过类来调用，这就称为静态方法。

    class Foo {
      static classMethod() {
        return 'hello';
      }
    }

    Foo.classMethod() // 'hello'

    var foo = new Foo();
    foo.classMethod()
    // TypeError: foo.classMethod is not a function

父类的静态方法可以被子类继承。

    class Foo {
      static classMethod() {
        return 'hello';
      }
    }

    class Bar extends Foo {
    }

    Bar.classMethod(); // 'hello'

静态方法也可以在super对象上调用的

    class Foo {
      static classMethod() {
        return 'hello';
      }
    }

    class Bar extends Foo {
      static classMethod() {
        return super.classMethod() + ', too';
      }
    }

    Bar.classMethod();

## Class的静态属性和实例属性
静态属性指的是class本身的属性，即Class.propname，而不是定义在实例上的属性。

    class Foo {
    }

    Foo.prop = 1;
    Foo.prop // 1

目前，只有这种方法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。

    // 以下两种写法都无效
    class Foo {
      // 写法一
      prop: 2

      // 写法二
      static prop: 2
    }

    Foo.prop // undefined

ES7有一个静态属性的提案，目前babel转码器支持。<br/>
这个提案对实例属性和静态属性，都规定了新的写法。

#### > 类的实例属性
类的实例属性可以用等号，写入类的定义之中。

    class MyClass {
      myProp = 42;

      constructor() {
        console.log(this.myProp); // 42
      }
    }

以前，我们定义实例属性，只能写在constructor方法里面。

    class ReactCounter extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
      }
    }

有了新的写法，实例属性的定义可以不在constructor中定义。

    class ReactCounter extends React.Component {
      state = {
        count: 0
      };
    }

#### > 类的静态属性

    class MyClass {
      static myStaticProp = 42;

      constructor() {
        console.log(MyClass.myStaticProp); // 42
      }
    }

新写法与老写法的区别

    // 老写法
    class Foo {
    }
    Foo.prop = 1;

    // 新写法
    class Foo {
      static prop = 1;
    }

## 类的私有属性
目前，有一个提案，为class加入私有属性。方法是在属性名之前，使用#表示。

    class Point {
      #x;

      constructor(x = 0) {
        #x = +x;
      }

      get x() { return #x }
      set x(value) { #x = +value }
    }

上面代码中，#x就表示私有属性x，在Point类之外是读取不到这个属性的。还可以看到，
私有属性和实例属性是可以同名的(#x和get x())。

私有属性可以指定初始值，在构造函数执行时进行初始化。

    class Point {
      #x = 0;
      constructor() {
        #x; // 0
      }
    }

之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为JS是一门
动态语言，使用独立的符号似乎是唯一的可靠方法，能够准确地区分一种属性是私有属性。
另外，Ruby语言使用@表示私有属性，ES6没有用这个符号而使用#，是因为@已经被留给
了Decorator。

该提案只规定了私有属性的写法，但是，很自然的也会想到，它也可以用来写私有方法。

    class Foo {
      #a;
      #b;
      #sum() { return #a + #b; }
      printSum() { console.log(#sum()); }
      constructor(a, b) { #a = a; #b = b; }
    }

## new.target属性
new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，
它返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，
new.target会返回undefined，因此，这个属性可以用来确定构造函数是怎么调用的。

    function Person(name) {
      if (new.target === Person) {
        this.name = name;
      } else {
        throw new Error('必须使用new生成实例');
      }
    }

    var person = new Person('张三'); // 正确
    var notAPerson = Person.call(person, '张三');  // 报错

上面代码确保构造函数只能通过new命令调用。

class内部调用new.target，返回当前class。

    class Rectangle {
      constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
      }
    }

    var obj = new Rectangle(3, 4); // 输出 true

需要注意的是，子类继承父类时，new.target会返回子类。

    class Rectangle {
      constructor(length, width) {
        console.log(new.target === Rectangle);
        // ...
      }
    }

    class Square extends Rectangle {
      constructor(length) {
        super(length, length);
      }
    }

    var obj = new Square(3); // 输出 false

利用这个特点，可以写出不能独立使用，必须继承后才能使用的类。

    class Shape {
      constructor() {
        if (new.target === Shape) {
          throw new Error('本类不能实例化');
        }
      }
    }

    class Rectangle extends Shape {
      constructor(length, width) {
        super();
        // ...
      }
    }

    var x = new Shape();  // 报错
    var y = new Rectangle(3, 4);  // 正确

