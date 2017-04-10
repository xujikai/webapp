## 数组的解构赋值
这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

	let [foo, [[bar], baz]] = [1, [[2], 3]];
	foo // 1
	bar // 2
	baz // 3
	
	let [ , , third] = ["foo", "bar", "baz"];
	third // "baz"
	
	let [x, , y] = [1, 2, 3];
	x // 1
	y // 3
	
	let [head, ...tail] = [1, 2, 3, 4];
	head // 1
	tail // [2, 3, 4]
	
	let [x, y, ...z] = ['a'];
	x // "a"
	y // undefined
	z // []

如果解构不成功，变量的值就等于undefined。

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

	let [x, y] = [1, 2, 3];
	x // 1
	y // 2
	
	let [a, [b], d] = [1, [2, 3], 4];
	a // 1
	b // 2
	d // 4

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
	
	// 报错
	let [foo] = 1;
	let [foo] = false;
	let [foo] = NaN;
	let [foo] = undefined;
	let [foo] = null;
	let [foo] = {};

对于 Set 结构，也可以使用数组的解构赋值。

	let [x, y, z] = new Set(['a', 'b', 'c']);
	x // "a"

### > 默认值

	let [foo = true] = [];
	foo // true
	
	let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

#### >> 注意
ES6 内部使用严格相等运算符（===），判断一个位置是否有值。<br/>
所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

	let [x = 1] = [undefined];
	x // 1
	
	let [x = 1] = [null];
	x // null

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

	let [x = 1, y = x] = [];     // x=1; y=1
	let [x = 1, y = x] = [2];    // x=2; y=2
	let [x = 1, y = x] = [1, 2]; // x=1; y=2
	let [x = y, y = 1] = [];     // ReferenceError

## 对象的解构赋值
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；<br/>
而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

	let { bar, foo } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"
	
	let { baz } = { foo: "aaa", bar: "bbb" };
	baz // undefined

如果变量名与属性名不一致，必须写成下面这样。

	var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
	baz // "aaa"
	
	let obj = { first: 'hello', last: 'world' };
	let { first: f, last: l } = obj;
	f // 'hello'
	l // 'world'

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

和数组一样，解构也可以用于嵌套结构的对象。

	let obj = {
	  p: [
	    'Hello',
	    { y: 'World' }
	  ]
	};
	
	let { p: [x, { y }] } = obj;
	x // "Hello"
	y // "World"

注意，这时p是模式，不是变量，因此不会被赋值。

## 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

	const [a, b, c, d, e] = 'hello';
	a // "h"
	b // "e"
	c // "l"
	d // "l"
	e // "o"

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

	let {length : len} = 'hello';
	len // 5

## 应用
### > 交换变量的值
	let x = 1;
	let y = 2;
	
	[x, y] = [y, x];

### > 从函数中返回多个值

	// 返回一个数组
	function example() {
	  return [1, 2, 3];
	}
	let [a, b, c] = example();
	
	// 返回一个对象
	function example() {
	  return {
	    foo: 1,
	    bar: 2
	  };
	}
	let { foo, bar } = example();

### > 函数参数的定义

	// 参数是一组有次序的值
	function f([x, y, z]) { ... }
	f([1, 2, 3]);
	
	// 参数是一组无次序的值
	function f({x, y, z}) { ... }
	f({z: 3, y: 2, x: 1});

### > 函数参数默认值
这样就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

	jQuery.ajax = function (url, {
	  async = true,
	  beforeSend = function () {},
	  cache = true,
	  complete = function () {},
	  crossDomain = false,
	  global = true,
	  // ... more config
	}) {
	  // ... do stuff
	};

### > 提取JSON数据

	let jsonData = {
	  id: 42,
	  status: "OK",
	  data: [867, 5309]
	};
	
	let { id, status, data: number } = jsonData;
	
	console.log(id, status, number);
	// 42, "OK", [867, 5309]

### > 遍历Map结构

	var map = new Map();
	map.set('first', 'hello');
	map.set('second', 'world');
	
	for (let [key, value] of map) {
	  console.log(key + " is " + value);
	}
	// first is hello
	// second is world

### > 输入模块的指定方法

	const { SourceMapConsumer, SourceNode } = require("source-map");