/**
 * Created by xxx on 2017/4/7.
 */
import React from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {getAllProducts} from './actions';
import App from './containers/App';

//创建中间件
const middleware = [thunk];
if(process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger());
}

//创建store
const store = createStore(reducer,applyMiddleware(...middleware));

//从api中获取products数据
store.dispatch(getAllProducts());

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);