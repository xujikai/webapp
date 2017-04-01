## Object.is()
ES5比较两个值是否相等，只有两种方法<br/>
    ==：会自动转型<br/>
    ===：NaN不等于自身，+0等于-0。<br/>

Object.is()比较两个值是否严格相等。与===行为基本一致。<br/>
不同之处：1. +0不等于-0。2. NaN等于自身。

    +0 === -0 //true
    NaN === NaN // false

    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true

## Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

	var target = { a: 1, b: 1 };
	var source1 = { b: 2, c: 2 };
	var source2 = { c: 3 };
	
	Object.assign(target, source1, source2);
	target // {a:1, b:2, c:3}

Object.assign方法执行的是浅拷贝，如果源对象的某个属性值是对象，那么目标对象得到的是这个对象的引用。

#### >常见用途
为对象添加属性

    class Point {
      constructor(x, y) {
        Object.assign(this, {x, y});
      }
    }

为对象添加方法

    Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {
        ···
      },
      anotherMethod() {
        ···
      }
    });

## Object.keys()，Object.values()，Object.entries()
Object.keys()：返回一个数组，成员是参数对象自身的(不含继承的)所有可遍历属性的键名。<br/>
Object.values()：同上的键值。

1. 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
2. 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
3. Object.values会过滤属性名为 Symbol 值的属性。

Object.entries()：同上的键值对。

1. 遍历对象的属性。

        let obj = { one: 1, two: 2 };
        for (let [k, v] of Object.entries(obj)) {
          console.log(
            `${JSON.stringify(k)}: ${JSON.stringify(v)}`
          );
        }
        // "one": 1
        // "two": 2

2. 将对象转为真正的Map结构。

        var obj = { foo: 'bar', baz: 42 };
        var map = new Map(Object.entries(obj));
        map // Map { foo: "bar", baz: 42 }
