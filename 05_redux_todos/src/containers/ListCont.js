/**
 * Created by admin on 2017/4/4.
 */
import {connect} from 'react-redux';
import ListComp from '../components/ListComp';
import {toggleTodo} from '../actions/TodoAct';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        todos:getVisibleTodos(state.todos, state.visibleFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onItemClick(id){
            dispatch(toggleTodo(id));
        }
    }
};

const ListCont = connect(mapStateToProps,mapDispatchToProps)(ListComp);

export default ListCont;