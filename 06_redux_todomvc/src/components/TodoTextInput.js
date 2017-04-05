/**
 * Created by xxx on 2017/4/5.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class TodoTextInput extends Component {

    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        editing: PropTypes.bool,
        newTodo: PropTypes.bool
    };

    state = {
        text: this.props.text || ''
    };

    render() {
        return (
            <input
                className={classnames({edit: this.props.editing, 'new-todo': this.props.newTodo})}
                type='text'
                autoFocus='true'
                placeholder={this.props.placeholder}
                value={this.state.text}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
            />
        );
    }

    handleBlur(e) {
        console.log('handleBlur');
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    handleChange(e) {
        console.log('handleChange');
        this.setState({
            text: e.target.value
        });
    }

    handleKeyDown(e){
        console.log('handleKeyDown');
        const text = e.target.value.trim();
        if(e.which === 13){
            this.props.onSave(text);
            if(this.props.newTodo){
                this.setState({text:''});
            }
        }
    }

}