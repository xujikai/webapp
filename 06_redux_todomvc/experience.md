以下内容为自己对该项目的理解

## 1.数据结构
在某一模块中，明确数据的属性

    todo{
        id//对象id
        completed//是否完成
        text//内容
    }

## 2.数据行为
    增：添加单个数据
    删：删除单个数据，删除已完成数据
    改：修改数据文本，修改数据是否完成，修改全部数据已完成
    查：查询所有，查询已完成，查询未完成

根据行为定义Action

## 3.数据行为产生的结果
通过增删改查的行为，查看数据发生的变化

    添加单个数据：在todos中添加一个todo
    删除单个数据：从todos中删除指定id的todo
    删除已完成数据：从todos中删除completed为true的todo
    修改数据文本：从todos中修改指定id的todo的text
    修改数据是否完成：从todos中修改指定id的todo的completed
    查询所有：返回todos
    查询已完成：返回todos中completed为true的部分todos
    查询未完成：返回todos中completed为false的部分todos

根据结果定义Reducer

## 4.组件(Component)

    * 所有数据都由props传递，通过定义propTypes确定组件需要的数据。
    * state中的数据，默认值为props中某一属性值。
    * 所有的点击事件，涉及到的数据改变，都由action处理。
    * 点击事件，如果不传递参数：onClick={onClearCompleted}
    * 如果传递参数：onClick={() => onShow(filter)}
