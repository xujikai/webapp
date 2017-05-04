## 构造函数
由于构造函数传入不同参数所代表的意义不同，所以不推荐使用构造函数创建Array对象。

    // 无参数时，返回一个空数组
    new Array() // []

    // 单个正整数参数，表示返回的新数组的长度
    new Array(1) // [ undefined ]
    new Array(2) // [ undefined x 2 ]

    // 非正整数的数值作为参数，会报错
    new Array(3.2) // RangeError: Invalid array length
    new Array(-3) // RangeError: Invalid array length

    // 单个非正整数参数（比如字符串、布尔值、对象等），
    // 则该参数是返回的新数组的成员
    new Array('abc') // ['abc']
    new Array([1]) // [Array[1]]

    // 多参数时，所有参数都是返回的新数组的成员
    new Array(1, 2) // [1, 2]
    new Array('a', 'b', 'c') // ['a', 'b', 'c']

如果要创建数组，推荐使用以下方法

    var arr = [1, 2];
    // ES6新增
    Array.from(); // 将类似数组的对象和可遍历的对象转为数组
    Array.of(); // 将一组值转为数组

## Array.isArray()
Array.isArray()用来判断一个值是否是数组，它是为了弥补typeof运算符的不足。

    var a = [1, 2, 3];

    typeof a // "object"
    Array.isArray(a) // true

## Array的实例方法
### > valueOf()和toString()
valueOf返回数组本身
toString返回数组的字符串形式

### > push()和pop() (都会改变原数组)
push用于在数组末尾添加一个或多个元素，并返回添加元素后的长度。
pop用于删除数组的最后一个元素，并返回该元素。

### > join()
join以参数作为分隔符，将所有数组成员组成一个字符串返回。
不过不提供参数，默认使用逗号。

### > concat()
concat用于多个数组的合并。返回新数组，原数组不变。

### > shift()和unshift() (都会改变原数组)
shift用于删除数组的第一个元素，并返回该元素。
unshift用于在数组开头添加一个或多个元素，并返回添加元素后的长度。

### > reverse() (会改变原数组)
reverse颠倒数组中元素的顺序，并返回改变后的数组。

### > slice()
slice用于提取原数组的一部分，返回一个新数组，原数组不变。

    arr.slice(start_index, end_index);

slice方法的一个重要应用，是将类似数组的对象转为真正的数组。

    Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 }) // ['a', 'b']
    Array.prototype.slice.call(document.querySelectorAll("div"));
    Array.prototype.slice.call(arguments);

### > splice() (会改变原数组)
splice用于删除原数组的一部分成员，并可以在被删除的位置加入新的数组成员，返回值是被删除的元素。

    arr.splice(index, count_to_remove, addElement1, addElement2, ...);

如果只是单纯地插入元素，splice方法的第二个参数可以设为0。

    var a = [1, 1, 1];

    a.splice(1, 0, 2) // []
    a // [1, 2, 1, 1]

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

    var a = [1, 2, 3, 4];
    a.splice(2) // [3, 4]
    a // [1, 2]

### > sort() (会改变原数组)
sort对数组成员进行排序，默认是按照字典顺序排序。

sort排序是按照对应字符串的字典顺序排序。数值会先被转为字符串，然后再排序。

    [10111, 1101, 111].sort()
    // [10111, 1101, 111]

自定义排序规则。大于0，代表a排在b的后面。

    [10111, 1101, 111].sort(function (a, b) {
      return a - b;
    })
    // [111, 1101, 10111]

### > map()
map对数组的所有成员都调用一个函数，根据函数结果返回一个新数组。

### > forEach()
forEach方法与map方法很相似，也是遍历数组的所有成员，执行某种操作，
但是forEach方法一般不返回值，只用来操作数据。

### > filter()
filter方法的参数是一个函数，所有数组成员依次执行该函数，
返回结果为true的成员组成一个新数组返回。

### > some()和every()
接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。

### > reduce()和reduceRight()
reduce和reduceRight依次处理数组的每个成员，最终累计为一个值。<br/>
它们的区别：reduce是从左到右，reduceRight是从右到左。

这两个方法的第一个参数都是一个函数。该函数接收四个参数：

1. 累积变量，默认为数组第一个元素
2. 当前变量，默认为数组第二个元素
3. 当前索引位置
4. 原数组

```js
[1, 2, 3, 4, 5].reduce(function(x, y){
  console.log(x, y)
  return x + y;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

### > indexOf()和lastIndexOf()
indexOf返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
