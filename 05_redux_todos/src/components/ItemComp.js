/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';

class ItemComp extends Component{

    render(){
        const {text, completed, onClick} = this.props;

        return(
            <li onClick={onClick}
                style={{textDecoration:completed ? 'line-through' : 'none'}}
                >{text}</li>
        );
    };

}

export default ItemComp;