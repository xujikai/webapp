/**
 * Created by xxx on 2017/4/5.
 */
import React,{Component} from 'react';
import classnames from 'classnames';

export default class TodoItem extends Component{

    render(){
        const { todo, completeTodo, deleteTodo } = this.props;

        let element = (
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>哈哈哈</label>
                <button className="destroy"/>
            </div>
        );

        return (<li className={classnames({completed:false,editing:false})}>{element}</li>);
    }

}