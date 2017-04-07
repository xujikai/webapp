## Set
它类似于数组，但是成员的值都是唯一的，没有重复的值。
以下为使用方法：
	
	// 例一
	var set = new Set([1, 2, 3, 4, 4]);
	[...set]
	// [1, 2, 3, 4]
	
	// 例二
	var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
	items.size // 5
	
	// 例三(类似数组的对象)
	function divs () {
	  return [...document.querySelectorAll('div')];
	}
	var set = new Set(divs());
	set.size // 56
	
	// 类似于
	divs().forEach(div => set.add(div));
	set.size // 56

#### > Set实例的属性和方法
Set结构的实例有以下属性。

- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

#### > Set遍历操作
Set结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

		let set = new Set(['red', 'green', 'blue']);
		for (let x of set) {
		  console.log(x);
		}
	
		set.forEach((value) => console.log(value * 2));

#### > Set遍历应用

##### >> 去除数组重复数据

	[...new Set(array)]
	//Array.from方法可以将Set结构转为数组。
	Array.from(new Set(array))

##### >> Set的并集，交集，差集

	let a = new Set([1, 2, 3]);
	let b = new Set([4, 3, 2]);
	
	// 并集
	let union = new Set([...a, ...b]);
	// Set {1, 2, 3, 4}
	
	// 交集
	let intersect = new Set([...a].filter(x => b.has(x)));
	// set {2, 3}
	
	// 差集
	let difference = new Set([...a].filter(x => !b.has(x)));
	// Set {1}
	
##### >> 在遍历操作中，同步改变原来的Set结构

	// 方法一
	let set = new Set([1, 2, 3]);
	set = new Set([...set].map(val => val * 2));
	// set的值是2, 4, 6
	
	// 方法二
	let set = new Set([1, 2, 3]);
	set = new Set(Array.from(set, val => val * 2));
	// set的值是2, 4, 6

## Map
类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

#### > 注意
只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。

	var map = new Map();
	
	map.set(['a'], 555);
	map.get(['a']) // undefined

#### > Map实例的属性和方法
- size属性返回Map结构的成员总数。
- set()设置key所对应的键值，然后返回整个Map结构。
- get()读取key对应的键值，如果找不到key，返回undefined。
- has()返回一个布尔值，表示某个键是否在Map数据结构中。
- delete()删除某个键，返回true。如果删除失败，返回false。
- clear()清除所有成员，没有返回值。

#### > Map遍历操作
Map结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

代码示例：

    let map = new Map([
      ['F', 'no'],
      ['T',  'yes'],
    ]);

    for (let key of map.keys()) {
      console.log(key);
    }

    for (let value of map.values()) {
      console.log(value);
    }

    for (let item of map.entries()) {
      console.log(item[0], item[1]);
    }

    // 或者
    for (let [key, value] of map.entries()) {
      console.log(key, value);
    }

#### > 与其他数据结构的相互转换
##### >> Map转数组
	let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
	[...myMap]
	// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
##### >> 数组转Map
	new Map([[true, 7], [{foo: 3}, ['abc']]])
	// Map {true => 7, Object {foo: 3} => ['abc']}
##### >> Map转为对象
如果所有Map的键都是字符串，它可以转为对象。

	function strMapToObj(strMap) {
	  let obj = Object.create(null);
	  for (let [k,v] of strMap) {
	    obj[k] = v;
	  }
	  return obj;
	}
	
	let myMap = new Map().set('yes', true).set('no', false);
	strMapToObj(myMap)
	// { yes: true, no: false }
##### >> 对象转为Map
	function objToStrMap(obj) {
	  let strMap = new Map();
	  for (let k of Object.keys(obj)) {
	    strMap.set(k, obj[k]);
	  }
	  return strMap;
	}
	
	objToStrMap({yes: true, no: false})
	// [ [ 'yes', true ], [ 'no', false ] ]
##### >> Map转为JSON
Map转为JSON要区分两种情况。一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON。

	function strMapToJson(strMap) {
	  return JSON.stringify(strMapToObj(strMap));
	}
	
	let myMap = new Map().set('yes', true).set('no', false);
	strMapToJson(myMap)
	// '{"yes":true,"no":false}'

另一种情况是，Map的键名有非字符串，这时可以选择转为数组JSON。

	function mapToArrayJson(map) {
	  return JSON.stringify([...map]);
	}
	
	let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
	mapToArrayJson(myMap)
	// '[[true,7],[{"foo":3},["abc"]]]'

##### >> JSON转为Map
JSON转为Map，正常情况下，所有键名都是字符串。

	function jsonToStrMap(jsonStr) {
	  return objToStrMap(JSON.parse(jsonStr));
	}
	
	jsonToStrMap('{"yes":true,"no":false}')
	// Map {'yes' => true, 'no' => false}

但是，有一种特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。

	function jsonToMap(jsonStr) {
	  return new Map(JSON.parse(jsonStr));
	}
	
	jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
	// Map {true => 7, Object {foo: 3} => ['abc']}