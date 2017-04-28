import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers';

import * as RouteUrl from './constants/RouteUrl';

import RootPage from './components/RootPage';
import MainPage from './components/MainPage';
import HotVideoContainer from './containers/HotVideoContainer';
import HotVideoDetailContainer from './containers/HotVideoDetailContainer';
import TestPage from './components/TestPage';

import './styles/HotVideoItem.scss';
import './styles/HotVideoDetail.scss';
import './styles/HotVideoCommentItem.scss';

const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(reducer, applyMiddleware(...middleware));

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path={RouteUrl.Index} component={HotVideoContainer}/>
                <Route path={RouteUrl.Main} component={MainPage}/>
                <Route path={RouteUrl.HotVideo} component={HotVideoContainer}/>
                <Route path={RouteUrl.HotVideoDetail} component={HotVideoDetailContainer}/>
                <Route path={RouteUrl.Test} component={TestPage}/>
            </div>
        </Router>
    </Provider>,
    document.querySelector('#root')
);