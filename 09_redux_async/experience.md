
写前思考：

    state {
        selectTitle:'reactjs',
        selectContents: {
            'reactjs':{

            },
            'frontend':{
                isFetching: false, //是否正在拉取数据
                didInvalidate: false, //数据是否非法(强制刷新)
                items: [], //数据集合
                lastUpdated: 111 //上次获取数据时间
            }
        }
    }

遇到问题：

1. 数据初始化问题

    在container中,传递数据到components中，<br/>
    要先判断传递的数据是否为空，如果为空，需要初始化一个默认对象，<br/>
    否则可能引用不到。
2. 忘记使用dispatch发送事件
3. 生命周期方法使用：componentWillReceiveProps

    在当前组件即将重新渲染时，会回调该方法，第一个参数：nextProps。
4. 定义行为，定义通用接口，都可以放在Action中。