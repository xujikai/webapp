## Redux 的设计思想

1. Web应用是一个状态机，视图与状态一一对应。
2. 所有的状态，保存在一个对象里面

## 基本概念

1. Store：保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。<br/>
2. State：Store对象包含所有数据，如果想获取某个时点的数据，就要对Store生成快照。
       这个时点的数据集合，就是State。<br/>
3. Action：State的变化必须是View导致的，Action就是View发出的通知，表示State要发生变化了。<br/>
4. Action Creator：View要发送多少种消息，就要有多少种Action，如果手写，会很麻烦。
       可以定义一个函数来生成Action，这个函数就叫Action Creator。<br/>
5. store.dispatch()：是View发出Action的唯一办法。
6. Reducer：Store收到Action后，必须给出一个新State，这样View才会发生变化。
       这种State的计算过程就叫做Reducer。<br/>
7. store.subscribe()：Store允许通过该方法设置监听函数，一旦State发生变化，就自动执行这个函数。

## Store的实现
Store提供了三个方法：
> store.getState(); 获取某一时点的快照。<br/>
> store.dispatch(); View发出Action的唯一办法。<br/>
> store.subscribe(); 设置监听函数。

    import { createStore } from 'redux';
    let { subscribe, dispatch, getState } = createStore(reducer);

    const createStore = (reducer) => {
      let state;
      let listeners = [];

      const getState = () => state;

      const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
      };

      const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter(l => l !== listener);
        }
      };

      dispatch({});

      return { getState, dispatch, subscribe };
    };

createStore()还可以接收第二个参数，表示State的最初状态。通常是服务器给出。

    let store = createStore(todoApp, window.STATE_FROM_SERVER);

上面的window.STATE_FROM_SERVER就是整个应用的初始状态值，此参数会覆盖Reducer函数的默认初始值。

## Reducer的拆分
Reducer函数负责生成State。由于整个应用只有一个State对象，包含所有数据，
对于大型应用来说，这个State必然十分庞大，导致Reducer函数也十分庞大。

    const chatReducer = (state = defaultState, action = {}) => {
      const { type, payload } = action;
      switch (type) {
        case ADD_CHAT:
          return Object.assign({}, state, {
            chatLog: state.chatLog.concat(payload)
          });
        case CHANGE_STATUS:
          return Object.assign({}, state, {
            statusMessage: payload
          });
        case CHANGE_USERNAME:
          return Object.assign({}, state, {
            userName: payload
          });
        default: return state;
      }
    };

上面代码中，三种Action分别改变State的三个属性。这三个属性之间没有联系，
这提示我们可以把Reducer函数拆分。不同的函数负责处理不同的属性，
最终把它们合并成一个Reducer即可。

    const chatReducer = (state = defaultState, action = {}) => {
      return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
      }
    };

#### combineReducers(暂未学习)

## 中间件
中间件就是一个函数，对store.dispatch()进行了改造，在发出Action和执行Reducer这两步之间，添加了其他功能。
日志中间件 redux-logger

    import { applyMiddleware, createStore } from 'redux';
    import createLogger from 'redux-logger';
    const logger = createLogger();

    const store = createStore(
      reducer,
      applyMiddleware(logger)
    );

#### > 注意
1. createStore()可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
2. 中间件的次序有讲究，使用时要先查看文档。

        const store = createStore(
          reducer,
          applyMiddleware(thunk, promise, logger)
        );

#### > applyMiddleware源码
它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。

    export default function applyMiddleware(...middlewares) {
      return (createStore) => (reducer, preloadedState, enhancer) => {
        var store = createStore(reducer, preloadedState, enhancer);
        var dispatch = store.dispatch;
        var chain = [];

        var middlewareAPI = {
          getState: store.getState,
          dispatch: (action) => dispatch(action)
        };
        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {...store, dispatch}
      }
    }

## 异步操作
同步操作只要发出一种Action即可，而异步操作要发出三种Action。<br/>
#### > 两种写法:

    // 写法一：名称相同，参数不同
    { type: 'FETCH_POSTS' }
    { type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
    { type: 'FETCH_POSTS', status: 'success', response: { ... } }

    // 写法二：名称不同
    { type: 'FETCH_POSTS_REQUEST' }
    { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
    { type: 'FETCH_POSTS_SUCCESS', response: { ... } }

除了Action不同之外，也要对State进行改造。

    let state = {
      // ...
      isFetching: true,  //是否正在抓取数据
      didInvalidate: true,  //数据是否过时
      lastUpdated: 'xxxxxxx'  //数据上次更新时间
    };

#### > 异步操作思路
> 操作开始时，发出一个Action，触发 State 更新为"正在操作"状态。<br/>
> 操作结束后，发出一个Action，触发 State 更新为"操作结束"状态。

## React-Redux
Redux作者专门为React封装的一个库

#### > UI组件
> 只负责UI的呈现，不带有任何业务逻辑。<br/>
> 没有状态(不使用this.state)。<br/>
> 所有数据都由this.props提供。<br/>
> 不使用任何Redux的API。

#### > 容器组件
> 负责管理数据和业务逻辑，不负责UI的呈现。<br/>
> 带有内部状态。<br/>
> 使用Redux的API。

#### > connect