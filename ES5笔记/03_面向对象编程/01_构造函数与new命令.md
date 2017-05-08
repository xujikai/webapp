## 对象的概念
面向对象，核心的思想是将真实世界中各种复杂的关系，抽象成一个个的对象，
然后由对象之间的分工与合作，完成对真实世界的模拟。

#### > 对象是单个实物的抽象。

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。
当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象编程。

#### > 对象是一个容器，封装了属性和方法。
所谓属性，就是对象的状态，所谓方法，就是对象的行为。<br/>
比如，我们可以把动物抽象成Animal对象，动物的名字就是属性，动物的行为就是方法。

## 构造函数
对象是单个实物的抽象，通常需要一个模板，表示某一类实物的共同特征。

JS使用构造函数作为对象的模板，所谓构造函数，就是专门用来生成对象的函数。
它提供模板，描述对象的基本结构。一个构造函数可以生成多个对象，这些对象都有相同的结构。

构造函数的写法，就是一个普通的函数。但是有自己的特征和用法。

    var Vehicle = function () {
      this.price = 1000;
    };

构造函数的特点

1. 函数体内部使用this关键字，代表了所要生成的对象实例。
2. 生成对象的时候，必须使用new关键字。
3. 为了和普通函数区别，首字母通常都是大写。

## new命令
new命令的作用，就是执行构造函数，返回一个对象的实例。

    var Vehicle = function (){
      this.price = 1000;
    };

    var v = new Vehicle();
    v.price // 1000

上面代码通过new命令，创建了一个Vehicle的实例，保存在变量v中。
这个新生成的实例，从构造函数中继承了price属性。
在new命令执行时，构造函数内部的this，就代表了新生成的实例对象，
this.price表示实例对象有一个price属性，它的值为1000。

#### >> 忘记书写new命令
这时候，构造函数就相当于普通函数，执行它并不能返回实例对象，
但是函数内部的this，这时代表全局对象，将造成一些意外的结果。

    var Vehicle = function (){
      this.price = 1000;
    };

    var v = Vehicle();
    v.price // Uncaught TypeError: Cannot read property 'price' of undefined

    price // 1000

在严格模式下，函数内部的this不能指向全局对象，默认等于undefined。

### > new命令的原理
使用new命令时，它后面的函数调用就不是正常的调用，
而是依次执行下面的步骤。

1. 创建一个空对象，作为将要返回对象的实例。
2. 将这个空对象的原型，指向构造函数的prototype属性。
3. 将这个空对象赋值给函数内部的this关键字。
4. 开始执行构造函数内部的代码。

也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。
构造函数的目的，就是操作一个空对象(即this对象)，将其构造为需要的样子。

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象。
否则，就不会管return语句，返回this对象。

如果对普通函数(内部没有使用this关键字的函数)使用new命令，则会返回一个空对象。

#### >> new命令简单的内部流程

    function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ param1) {
      // 将 arguments 对象转为数组
      var args = [].slice.call(arguments);
      // 取出构造函数
      var constructor = args.shift();
      // 创建一个空对象，继承构造函数的 prototype 属性
      var context = Object.create(constructor.prototype);
      // 执行构造函数
      var result = constructor.apply(context, args);
      // 如果返回结果是对象，就直接返回，则返回 context 对象
      return (typeof result === 'object' && result != null) ? result : context;
    }

    // 实例
    var actor = _new(Person, '张三', 28);

### > new.target
函数内部可以使用new.target属性。如果当前函数是new命令调用，
new.target指向当前函数，否则为undefined。

    function f() {
      console.log(new.target === f);
    }

    f() // false
    new f() // true

