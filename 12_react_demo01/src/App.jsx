import React from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Router,Route,IndexRoute,browserHistory,hashHistory} from 'react-router';
import reducer from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './style/page.scss';

import RootPage from './component/RootPage';
import MainContainer from './containers/MainContainer';
import OrderPage from './component/OrderPage';
import ProductPage from './component/ProductPage';
import LoginPage from './component/LoginPage';
import HotVideoPage from './component/HotVideoPage';
import HotVideoDetail from './component/HotVideoDetail';
import TestTextPage from './component/TestTextPage';

// 代码执行区

injectTapEventPlugin();

const middleware = [thunk];

const store = createStore(reducer,applyMiddleware(...middleware));

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={RootPage}>
                <Route path="/main" component={MainContainer}/>
                <Route path="/order" component={OrderPage}/>
                <Route path="/product" component={ProductPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/hotVideo" component={HotVideoPage}/>
                <Route path="/detail" component={HotVideoDetail}/>
                <Route path="/test" component={TestTextPage}/>
            </Route>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);