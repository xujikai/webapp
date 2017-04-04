/**
 * Created by xxx on 2017/4/1.
 */
import {combineReducers} from 'redux';
import todos from './Todos';
import visibleFilter from './VisibleFilter';

const todoApp = combineReducers({
    todos,
    visibleFilter
});

export default todoApp;