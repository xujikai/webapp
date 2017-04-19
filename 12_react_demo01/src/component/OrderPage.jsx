import React, {Component} from 'react';
import Header from './Header';
import OrderItem from './OrderItem';
import '../style/order.scss';

export default class OrderPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chooseName:'failed'
        };
    }

    render() {
        const {chooseName} = this.state;

        return (
            <div className="component_container order_container">
                <Header title="订单记录"/>
                <div className="order_tab_container">
                    <div className={`order_tab_item ${chooseName === 'failed' ? 'order_tab_choose' : ''}`}
                         name="failed" onClick={this.chooseTabItem}>未通过</div>
                    <span/>
                    <div className={`order_tab_item ${chooseName === 'waited' ? 'order_tab_choose' : ''}`}
                         name="waited" onClick={this.chooseTabItem}>待审核</div>
                    <span/>
                    <div className={`order_tab_item ${chooseName === 'passed' ? 'order_tab_choose' : ''}`}
                         name="passed" onClick={this.chooseTabItem}>已通过</div>
                </div>
                <ul>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </ul>
            </div>
        );
    }

    chooseTabItem = (e) => {
        e.preventDefault();
        // console.log(e.target);
        // console.log(e.target.getAttribute('name'));
        const name = e.target.getAttribute('name');
        this.setState({
            chooseName: name,
        });
    }

}