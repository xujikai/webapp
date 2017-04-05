/**
 * Created by xxx on 2017/4/5.
 */
import React,{Component} from 'react';
import classnames from 'classnames';

export default class Footer extends Component{

    render(){
        return(
            <footer className="footer">
                {this.renderTodoCount()}
                <ul className="filters">
                    {
                        ['All','Active','Completed'].map(filter => {
                            return (
                                <li key={filter}>
                                    {this.renderFilterLink(filter)}
                                </li>
                            );
                        })
                    }
                </ul>
                {this.renderClearButton()}
            </footer>
        );
    }

    renderTodoCount() {
        const { activeCount } = this.props;

        return (
            <span className="todo-count">
                <strong>{activeCount || 'NO'}</strong> item left
            </span>
        );
    }

    renderFilterLink(filter) {
        return (
            <a className={classnames()} style={{cursor:'pointer'}}>{filter}</a>
        );
    }

    renderClearButton() {
        return (
            <button className="clear-completed">
                Clear Completed
            </button>
        );
    }

}