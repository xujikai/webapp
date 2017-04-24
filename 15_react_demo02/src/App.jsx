import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RootPage from './components/RootPage';
import MainPage from './components/MainPage';
import TestPage from './components/TestPage';

render(
    <Router>
        <RootPage>
            <Route path="/main" component={MainPage}/>
            <Route path="/test" component={TestPage}/>
        </RootPage>
    </Router>,
    document.querySelector('#root')
);