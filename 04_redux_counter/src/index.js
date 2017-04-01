/**
 * Created by xxx on 2017/3/31.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import Counter from './components/Counter';
import mCounterReducer from './reducers/CounterReducer';

const store = createStore(mCounterReducer);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({type:'INCREMENT'})}
            onDecrement={() => store.dispatch({type:'DECREMENT'})}
        />,
        document.getElementById('root')
    );
};

render();
store.subscribe(render);