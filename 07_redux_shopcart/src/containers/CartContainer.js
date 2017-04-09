/**
 * Created by admin on 2017/4/9.
 */
import React from 'react';
import {connect} from 'react-redux';
import {checkout} from '../actions';
import Cart from '../components/Cart';

const mapStateToProps = (state) => {
    const cart = state.cart;
    const products = state.products;

    let mCartProducts = [];
    let mTotal = 0;
    for(let [key,value] of cart){
        let product = {...products.get(key),quantity:value};
        mTotal += product.quantity * product.price;
        mCartProducts.push(product);
    }
    console.log(mCartProducts);
    console.log(mTotal);

    return {
        products: mCartProducts,
        total: mTotal,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkout:(products) => {
            dispatch(checkout(products));
        }
    }
};

const CartContainer = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default CartContainer;