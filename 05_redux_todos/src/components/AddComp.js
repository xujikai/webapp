/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';

class AddComp extends Component{

    render(){

        const { onSubmit } = this.props;

        return(
            <form onSubmit={ e => {
                e.preventDefault();

                let input = this.refs["input"];
                if(!input.value.trim()) return;

                onSubmit(input.value);
                //store.dispatch(addTodo(input.value));
                input.value = "";
            }}>
                <input ref="input"/>
                <button type="submit">Add</button>
            </form>
        );
    }

}

export default AddComp;