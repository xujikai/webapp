## 属性的简洁表示法

    const name = '张三';
    const age = 10;

    var person = {
        name,
        age,
        speak(){
            return 'speak ...';
        }
    }

    等同于
    var person = {
        name: name,
        age: age,
        speak: function(){
            return 'speak ...';
        }
    }

## 属性名表达式
ES6中，使用大括号定义变量新增一种定义属性的方式。

    let propKey = 'foo';

    let obj = {
      name: '张三',           // ES5写法
      [propKey]: true,        // 新增写法
      ['a' + 'bc']: 123       // 新增写法
    };

    obj.foo // true
    obj.abc // 123

注意：
- 属性名表达式和属性简洁表示法不能同时使用，会报错。
- 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串。

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

注意：
- 如果该参数不是对象，则会先转成对象，然后返回。
- 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
- 如果非对象值不在第一个位置，那么处理规则有所不同。
  这些参数都会转成对象，如果无法转成对象，就会跳过。
- 其它类型的值不在第一个位置，除了字符串会以数组形式，拷贝入目标对象，
  其他值都不会产生效果。这是因为只有字符串的包装对象，会产生可枚举属性。
- Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），
  也不拷贝不可枚举的属性（enumerable: false）。
- 属性名为Symbol值的属性，也会被Object.assign拷贝。

#### > 问题点
Object.assign方法执行的是浅拷贝，如果源对象的某个属性值是对象，
那么目标对象得到的是这个对象的引用。

#### > 常见用途
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

克隆对象

    function clone(origin) {
      return Object.assign({}, origin);
    }

    // 保持继承链
    function clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }

合并对象

    const merge =
      (target, ...sources) => Object.assign(target, ...sources);

    // 合并后返回新对象
    const merge =
      (...sources) => Object.assign({}, ...sources);

## 属性的遍历
ES6中一共有5种方式遍历对象

for...in
> for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

Object.keys(obj)
> Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

Object.getOwnPropertyNames(obj)
> Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

Object.getOwnPropertySymbols(obj)
> Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

Reflect.ownKeys(obj)
> Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。

以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
- 首先遍历所有属性名为数值的属性，按照数字排序。
- 其次遍历所有属性名为字符串的属性，按照生成时间排序。
- 最后遍历所有属性名为Symbol值的属性，按照生成时间排序。

## Object.getPrototypeOf()、Object.setPrototypeOf()

设置原型

    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40

获取原型

    function Rectangle() {
      // ...
    }

    var rec = new Rectangle();

    Object.getPrototypeOf(rec) === Rectangle.prototype
    // true

    Object.setPrototypeOf(rec, Object.prototype);
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // false

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

## 对象的扩展运算符
有两个作用，一个是对象的解构赋值，一个是作为扩展运算符

