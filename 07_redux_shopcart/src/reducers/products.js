/**
 * Created by admin on 2017/4/8.
 */
import * as types from '../constants/ActionTypes';

const initState = new Map([
    [4,{id:4,title:'哈哈',price:10,inventory:3}],
    [5,{id:5,title:'嘻嘻',price:20,inventory:4}]
]);

const products = (state = initState,action) => {
    let map ;
    switch(action.type){
        case types.RECEIVE_PRODUCTS:
            map = new Map(state);
            action.products.forEach(item => {
                map.set(item.id,item);
            });
            return map;
        case types.ADD_TO_CART:
            map = new Map(state);
            let product = map.get(action.productId);
            product.inventory--;
            map.set(action.productId,product);
            return map;
        default:
            return state;
    }
};

export default products;