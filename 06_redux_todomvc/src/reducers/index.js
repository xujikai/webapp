/**
 * Created by xxx on 2017/4/5.
 */
import {combineReducers} from 'redux';
import todos from './todos';

const rootReducer = combineReducers({
    todos
});

export default rootReducer;