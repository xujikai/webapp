## 箭头函数

格式1：只包含一个表达式，连{...}和return都省略掉了。

    const fn = x => x * x;

格式2：包含多条语句，这时候{...}和return不能省略。

    x => {
        if (x > 0) {
            return x * x;
        } else {
            return - x * x;
        }
    }

注意：如果要返回对象，因为和函数体有冲突，所以要在外面加一层();

    x => ({ foo: x })

#### > this
箭头函数看上去是匿名函数的一种简写，但实际上，<br/>
箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。

    var obj = {
        birth: 1990,
        getAge: function () {
            var b = this.birth; // 1990
            var fn = function () {
                return new Date().getFullYear() - this.birth; // this指向window或undefined
            };
            return fn();
        }
    };

    var obj = {
        birth: 1990,
        getAge: function () {
            var b = this.birth; // 1990
            var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
            return fn();
        }
    };

由于this在箭头函数中已经按照词法作用域绑定了，<br/>
所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略。

## 函数参数的默认值

	function log(x, y = 'World') {
	  console.log(x, y);
	}
	
	log('Hello') // Hello World
	log('Hello', 'China') // Hello China
	log('Hello', '') // Hello

## 与解构赋值默认值结合使用

示例1

	function foo({x, y = 5}) {
	  console.log(x, y);
	}
	
	foo({}) // undefined, 5
	foo({x: 1}) // 1, 5
	foo({x: 1, y: 2}) // 1, 2
	foo() // TypeError: Cannot read property 'x' of undefined

上面代码使用了对象的解构赋值默认值，而没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值而生成。如果函数foo调用时参数不是对象，变量x和y就不会生成，从而报错。如果参数对象没有y属性，y的默认值5才会生效。

示例2

	function fetch(url, { body = '', method = 'GET', headers = {} }) {
	  console.log(method);
	}
	
	fetch('http://example.com', {})
	// "GET"
	
	fetch('http://example.com')
	// 报错
上面代码中，如果函数fetch的第二个参数是一个对象，就可以为它的三个属性设置默认值。

上面的写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。

	function fetch(url, { method = 'GET' } = {}) {
	  console.log(method);
	}
	
	fetch('http://example.com')
	// "GET"


再请问下面两种写法有什么差别？

	// 写法一
	function m1({x = 0, y = 0} = {}) {
	  return [x, y];
	}
	
	// 写法二
	function m2({x, y} = { x: 0, y: 0 }) {
	  return [x, y];
	}

上面两种写法都对函数的参数设定了默认值，区别是<br/>
写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；<br/>
写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]
	
	// x和y都有值的情况
	m1({x: 3, y: 8}) // [3, 8]
	m2({x: 3, y: 8}) // [3, 8]
	
	// x有值，y无值的情况
	m1({x: 3}) // [3, 0]
	m2({x: 3}) // [3, undefined]
	
	// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]
	
	m1({z: 3}) // [0, 0]
	m2({z: 3}) // [undefined, undefined]

## 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。<br/>
如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

	// 例一
	function f(x = 1, y) {
	  return [x, y];
	}
	
	f() // [1, undefined]
	f(2) // [2, undefined])
	f(, 1) // 报错
	f(undefined, 1) // [1, 1]
	
	// 例二
	function f(x, y = 5, z) {
	  return [x, y, z];
	}
	
	f() // [undefined, 5, undefined]
	f(1) // [1, 5, undefined]
	f(1, ,2) // 报错
	f(1, undefined, 2) // [1, 5, 2]

如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

## 函数的 length 属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
	
	(function (a) {}).length // 1
	(function (a = 5) {}).length // 0
	(function (a, b, c = 5) {}).length // 2