/**
 * Created by admin on 2017/4/8.
 */
import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../actions';
import ProductsList from '../components/ProductsList';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        products: [...(state.products).values()],
        title: 'Products'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId) => {
            dispatch(addToCart(productId));
        }
    }
};

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsList);

export default ProductsContainer;

