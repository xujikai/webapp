/**
 * Created by xxx on 2017/4/5.
 */
import React,{Component,PropTypes} from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import {SHOW_ALL,SHOW_ACTIVE,SHOW_COMPLETED} from '../constants/TodoFilters';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component{

    static propTypes = {
        todos:PropTypes.array.isRequired,
        actions:PropTypes.object.isRequired
    };

    state = {
        filter: SHOW_ALL
    };

    render(){
        const {todos,actions} = this.props;
        const {filter} = this.state;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count,todo) => {
            return todo.completed ? count + 1 : count
        },0);

        return(
            <section className="main">
                <ul className="todo-list">
                    <TodoItem/>
                    <TodoItem/>
                    <TodoItem/>
                    <TodoItem/>
                </ul>
                <Footer/>
            </section>
        );
    }

}