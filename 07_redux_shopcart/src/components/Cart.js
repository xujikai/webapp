/**
 * Created by admin on 2017/4/9.
 */
import React,{PropTypes} from 'react';
import Product from './Product';

const Cart = ({products,total,checkout}) => {
    let hasProducts = products.length > 0;

    const nodes = hasProducts ? (
        products.map(product =>
            <Product
                key={product.id}
                title={product.title}
                price={product.price}
                quantity={product.quantity}
            />
        )
    ) : (
        <em>Please add some products to cart.</em>
    );

    return (
        <div>
            <h3>Your Cart</h3>
            <div>{nodes}</div>
            <p>Total: &#36;{total}</p>
            <button
                onClick={() => checkout(products)}
                disabled={hasProducts ? '' : 'disabled'}>
                Checkout
            </button>
        </div>
    )
};

Cart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    total:PropTypes.number
};

export default Cart;