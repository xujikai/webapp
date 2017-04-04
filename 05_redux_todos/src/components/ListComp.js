/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
import ItemComp from './ItemComp';

class ListComp extends Component{

    render(){
        const { todos, onItemClick } = this.props;

        return(
            <ul>
                {
                    todos.map(item => {
                        return <ItemComp key={item.id} {...item}
                                         onClick={() => onItemClick(item.id)}/>;
                    })
                }
            </ul>
        );
    }

}

export default ListComp;