import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import RootPage from './components/RootPage';
import MainPage from './components/MainPage';
import HotVideoContainer from './containers/HotVideoContainer';
import TestPage from './components/TestPage';

import './styles/HotVideoItem.scss';

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

render(
    <Provider store={store}>
        <Router>
            <RootPage>
                <Route path="/main" component={MainPage}/>
                <Route path="/hotVideo" component={HotVideoContainer}/>
                <Route path="/test" component={TestPage}/>
            </RootPage>
        </Router>
    </Provider>,
    document.querySelector('#root')
);