import React,{Component} from 'react';
import '../style/product_item.scss';

export default class ProductItem extends Component{

    render(){
        return(
            <li className="item_container">
                <div className="item_name">微波炉</div>
                <div className="item_number_container">
                    <button className="item_reduce"/>
                    <input className="item_number" type="text" value="3" maxLength={5}/>
                    <button className="item_add"/>
                </div>
            </li>
        );
    }

}