/**
 * Created by xxx on 2017/4/1.
 */
import React from 'react';
import { render } from 'react-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/TodoRedu';
import App from './components/AppComp';

const store = createStore(reducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);