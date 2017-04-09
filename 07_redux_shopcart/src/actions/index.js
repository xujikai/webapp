/**
 * Created by admin on 2017/4/8.
 */
import shop from '../api/shop';
import * as types from '../constants/ActionTypes';

const receiveProducts = products => ({
    type:types.RECEIVE_PRODUCTS,
    products
});

export const getAllProducts = () => (dispatch) => {
    shop.getProducts(products => {
        dispatch(receiveProducts(products));
    })
};

const addToCartUnsafe = productId => ({
    type: types.ADD_TO_CART,
    productId
});

export const addToCart = (productId) => (dispatch,getState) => {
    if(getState().products.get(productId).inventory > 0){
        dispatch(addToCartUnsafe(productId));
    }
};

export const checkout = (products) => (dispatch,getState) => {
    const {cart} = getState();
    dispatch({
        type:types.CHECKOUT_REQUEST
    });

    shop.buyProducts(products,() => {
        dispatch({
            type:types.CHECKOUT_SUCCESS,
            cart
        });
    });
};

// const getA = () => {
//     console.log('getA');
//     return () => {
//         console.log('getB');
//     };
// };
// getA();

// const map = new Map();
// map.set(1,'哈哈1');
// map.set(2,'哈哈2');
// map.set(3,'哈哈3');
// console.log(map.length);//undefined
// console.log(map.size);//3
// console.log([...(map).values()]);
