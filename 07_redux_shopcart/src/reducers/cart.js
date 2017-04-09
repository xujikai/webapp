/**
 * Created by xxx on 2017/4/7.
 */
import * as types from '../constants/ActionTypes';

const initState = new Map();

const cart = (state = initState,action) => {
    switch (action.type){
        case types.ADD_TO_CART:
            let map = new Map(state);
            let quantity = map.get(action.productId);
            map.set(action.productId,quantity > 0 ? ++quantity : 1);
            return map;
        case types.CHECKOUT_REQUEST:
            return state;
        case types.CHECKOUT_SUCCESS:
            return new Map();
        default:
            return state;
    }
};

export default cart;