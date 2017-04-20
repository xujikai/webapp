import React from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Router,Route,IndexRoute,browserHistory,hashHistory} from 'react-router';
import reducer from './reducers';
import MainContainer from './containers/MainContainer';
import OrderPage from './component/OrderPage';
import ProductPage from './component/ProductPage';

const middleware = [thunk];

const store = createStore(reducer,applyMiddleware(...middleware));

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={MainContainer}/>
            <Route path="/order" component={OrderPage}/>
            <Route path="/product" component={ProductPage}/>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);