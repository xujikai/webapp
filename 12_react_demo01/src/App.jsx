import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,browserHistory,hashHistory} from 'react-router';
import MainPage from './component/MainPage';
import OrderPage from './component/OrderPage';
import ProductPage from './component/ProductPage';

render(
    <div>
        <Router history={hashHistory}>
            <Route path="/" component={MainPage}/>
            <Route path="/order" component={OrderPage}/>
            <Route path="/product" component={ProductPage}/>
        </Router>
    </div>,
    document.body.appendChild(document.createElement('div'))
);