import React, {Component} from 'react';
import '../style/product_item.scss';

export default class ProductItem extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isCheck: false,
            number: 0,
        };
    }

    render() {
        return (
            <li className="item_product_container">
                <div className={`item_name ${this.state.isCheck ? 'item_name_check' : ''}`}
                     onClick={() => this.handleChangeCheck()}>微波炉</div>
                <div className="item_number_container">
                    <button className="item_reduce" onClick={() => this.handleReduce()}/>
                    <input className="item_number" type="text" value={this.state.number} maxLength={5}/>
                    <button className="item_add" onClick={() => this.handleAdd()}/>
                </div>
            </li>
        );
    }

    handleChangeCheck() {
        this.setState({
            isCheck: !this.state.isCheck
        });
    }

    handleAdd() {
        const {isCheck,number} = this.state;
        if(isCheck){
            this.setState({
                number: number + 1
            });
        }
    }

    handleReduce() {
        const {isCheck,number} = this.state;
        if(isCheck && number > 0){
            this.setState({
                number: number - 1
            });
        }
    }

}