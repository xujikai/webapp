/**
 * Created by xxx on 2017/4/5.
 */
import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TodoActions from '../actions';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

const App = ({todos,actions}) => (
    <div>
        {console.log(todos)}
        {console.log(actions)}
        <Header addTodo={actions.addTodo}/>
        <MainSection todos={todos} actions={actions}/>
    </div>
);

App.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(App);

