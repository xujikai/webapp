/**
 * Created by xxx on 2017/4/5.
 */
import React,{Component,PropTypes} from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component{

    static propTypes = {
        addTodo:PropTypes.func.isRequired
    };

    render(){
        return(
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave.bind(this)}
                    placeholder="What needs to be done?"/>
            </header>
        );
    }

    handleSave(text){
        console.log(`handleSave ${text}`);
        if(text.length !== 0){
            this.props.addTodo(text);
        }
    }

}