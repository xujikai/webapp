## Array.from()
Array.from方法用于将两类对象转为真正的数组：<br/>

1. 类似数组的对象（array-like object）
2. 可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）

类似数组的对象

    let arrayLike = { // 可以使用length属性
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。<br/>
Array.from都可以将它们转为真正的数组。

	// NodeList对象
	let ps = document.querySelectorAll('p');
	Array.from(ps).forEach(function (p) {
	  console.log(p);
	});
	
	// arguments对象
	function foo() {
	  var args = Array.from(arguments);
	  // ...
	}

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

	Array.from(arrayLike, x => x * x);
	// 等同于
	Array.from(arrayLike).map(x => x * x);
	
	Array.from([1, 2, 3], (x) => x * x)
	// [1, 4, 9]

如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。<br/>
因为它能正确处理各种Unicode字符，可以避免JS将大于\uFFFF的Unicode字符，算作两个字符的bug。

    function countSymbols(string) {
      return Array.from(string).length;
    }

## Array.of()
Array.of方法用于将一组值，转换为数组。

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

	Array.of(3, 11, 8) // [3,11,8]
	Array.of(3) // [3]
	Array.of(3).length // 1

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

	Array() // []
	Array(3) // [, , ,]
	Array(3, 11, 8) // [3, 11, 8]

上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。<br/>
当参数个数不少于2个时，Array()才会返回由参数组成的新数组。<br/>
当参数个数只有一个时，实际上是指定数组的长度。

## 数组实例的copyWithin()
数组实例的copyWithin方法，在当前数组的内部，将指定位置的成员复制到其他位置(会覆盖原有成员)，然后返回当前数组。
也就是说，使用该方法会修改当前数组。

    Array.prototype.copyWithin(target, start = 0, end = this.length)

    * target（必需）：从该位置开始替换数据。
    * start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    * end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

    [1, 2, 3, 4, 5].copyWithin(0, 3) // [4, 5, 3, 4, 5]

## 数组实例的find()和findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。

它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。<br/>
如果没有符合条件的成员，则返回undefined。

	[1, 5, 10, 15].find(function(value, index, arr) {
	  return value > 9;
	}) // 10

数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

	[1, 5, 10, 15].findIndex(function(value, index, arr) {
	  return value > 9;
	}) // 2

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

##### > 注意，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。

	[NaN].indexOf(NaN) // -1
	
	[NaN].findIndex(value => Object.is(NaN, value)) // 0

## 数组实例的fill()
fill方法使用给定值，填充一个数组。

	['a', 'b', 'c'].fill(7)
	// [7, 7, 7]
	
	new Array(3).fill(7)
	// [7, 7, 7]

fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

## 数组实例的entries()，keys()和values()
keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历<br/>
它们都返回一个遍历器对象，可以用for...of循环进行遍历

	for (let index of ['a', 'b'].keys()) {
	  console.log(index);
	}
	// 0
	// 1
	
	for (let elem of ['a', 'b'].values()) {
	  console.log(elem);
	}
	// 'a'
	// 'b'
	
	for (let [index, elem] of ['a', 'b'].entries()) {
	  console.log(index, elem);
	}
	// 0 "a"
	// 1 "b"

## 数组实例的includes()
includes()表示某个数组是否包含给定的值，与字符串的includes()相似。

	[1, 2, 3].includes(2);     // true
	[1, 2, 3].includes(4);     // false
	[1, 2, NaN].includes(NaN); // true

该方法的第二个参数表示搜索的起始位置，默认为0。<br/>
如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

	[1, 2, 3].includes(3, 3);  // false
	[1, 2, 3].includes(3, -1); // true

在没有该方法之前的时候，我们使用indexOf()进行判断。<br/>
该方法有两个缺点：一个是不够语义化，一个是造成NaN的误判(因为内部使用===运算符)。

另外，Map和Set数据结构有一个has方法，需要注意与includes区分。

	Map结构的has方法，是用来查找键名的，
		比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
	Set结构的has方法，是用来查找值的，
		比如Set.prototype.has(value)、WeakSet.prototype.has(value)。