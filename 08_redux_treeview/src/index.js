/**
 * Created by xxx on 2017/4/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import genTree from './genTree';
import NodeContainer from './containers/NodeContainer';

const tree = genTree();
const store = createStore(reducer,tree);

ReactDOM.render(
    <Provider store={store}>
        <NodeContainer id={0}/>
    </Provider>,
    document.querySelector('#root')
);
