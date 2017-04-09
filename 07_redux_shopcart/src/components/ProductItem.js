/**
 * Created by admin on 2017/4/8.
 */
import React,{PropTypes} from 'react';
import Product from './Product';

const ProductItem = ({product,onAddToCart}) => (
    <div>
        <Product
            title={product.title}
            price={product.price}
            quantity={product.inventory}
        />

        <button
            onClick={onAddToCart}
            disabled={product.inventory > 0 ? '' : 'disabled'}>
            {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
        </button>
    </div>
);

ProductItem.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default ProductItem;