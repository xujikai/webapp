/**
 * Created by xxx on 2017/4/5.
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'todomvc-app-css/index.css';
import reducer from './reducers';
import App from './containers/App';

const store = createStore(reducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);