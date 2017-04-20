/**
 * Created by xxx on 2017/4/20.
 */
import {connect} from 'react-redux';
import OrderItemPage from '../component/OrderItem';

const mapStateToProps = (state) => {
    return {
        order:{}
    }
};

const mapDispatchToProps = (dispatch) => {

};

const OrderItemContainer = connect(mapStateToProps,mapDispatchToProps)(OrderItemPage);

export default OrderItemContainer;