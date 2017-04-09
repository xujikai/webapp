/**
 * Created by xxx on 2017/4/7.
 */
import {combineReducers} from 'redux';
import products from './products';
import cart from './cart';

export default combineReducers({
    products,
    cart
});