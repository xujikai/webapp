import React, {Component} from 'react';
import Header from './Header';
import OrderItem from './OrderItem';
import {ORDER_FAILED,ORDER_WAITED,ORDER_PASSED} from '../constants/Config';
import '../style/order.scss';

export default class OrderPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chooseName: ORDER_FAILED
        };
    }

    render() {
        const {chooseName} = this.state;
        const {ordersAll} = this.props;

        return (
            <div className="component_container order_container">
                <Header title="订单记录"/>
                <div className="order_tab_container">
                    <div className={`order_tab_item ${chooseName === ORDER_FAILED ? 'order_tab_choose' : ''}`}
                         onClick={() => {this.chooseTabItem(ORDER_FAILED)}}>未通过</div>
                    <span/>
                    <div className={`order_tab_item ${chooseName === ORDER_WAITED ? 'order_tab_choose' : ''}`}
                         onClick={() => {this.chooseTabItem(ORDER_WAITED)}}>待审核</div>
                    <span/>
                    <div className={`order_tab_item ${chooseName === ORDER_PASSED ? 'order_tab_choose' : ''}`}
                         onClick={() => {this.chooseTabItem(ORDER_PASSED)}}>已通过</div>
                </div>
                <ul>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </ul>
            </div>
        );
    }

    chooseTabItem(name) {
        this.setState({
            chooseName: name
        });
    }

    // chooseTabItem = (e) => {
    //     e.preventDefault();
    //     // console.log(e.target);
    //     // console.log(e.target.getAttribute('name'));
    //     const name = e.target.getAttribute('name');
    //     this.setState({
    //         chooseName: name,
    //     });
    // }

}