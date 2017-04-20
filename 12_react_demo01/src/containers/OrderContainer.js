/**
 * Created by xxx on 2017/4/20.
 */
import {connect} from 'react-redux';
import * as actions from '../actions';
import OrderPage from '../component/OrderPage';
import {ORDER_FAILED,ORDER_WAITED,ORDER_PASSED} from '../constants/Config';

const mapStateToProps = (state) => {
    return {
        ordersAll: { //包含未通过，待审核，已通过三种数据
            [ORDER_FAILED]: [],
            [ORDER_WAITED]: [],
            [ORDER_PASSED]: []
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersByType: () => {

        }
    }
};

const OrderContainer = connect(mapStateToProps,mapDispatchToProps)(OrderPage);

export default OrderContainer;