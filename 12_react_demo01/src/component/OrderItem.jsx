import React,{Component} from 'react';
import '../style/order_item.scss'

export default class OrderItem extends Component{

    render(){
        return(
            <li className="item_order_container">
                <header>
                    <span>创建时间：2017.01.10 20:43</span>
                    <span className="item_status">待审核</span>
                </header>
                <div className="item_row">
                    <span>客<span style={{display:'inline-block',width:'1.5rem'}}/>户：</span>
                    <span>storm</span>
                    <span>123321123</span>
                </div>
                <div className="item_row">
                    <span>购买商品：</span>
                    <span style={{marginRight:'0.875rem'}}>PaiPad(2G/32G)</span>
                    <span>微波炉</span>
                </div>
                <div className="item_row item_money">
                    <div>
                        <span>订单金额：</span>
                        <span className="item_color_red">¥12</span>
                    </div>
                    <div>
                        <span>佣金：</span>
                        <span className="item_color_red">¥3</span>
                    </div>
                </div>
            </li>
        );
    }

}