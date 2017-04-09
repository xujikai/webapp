/**
 * Created by admin on 2017/4/8.
 */
import React,{PropTypes} from 'react';
import ProductItem from './ProductItem';

const ProductsList = ({title,products,addToCart}) => (
    <div>
        <h3>{title}</h3>
        {
            products.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product.id)}/>
            ))
        }
    </div>
);

ProductsList.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
    })).isRequired,
    addToCart: PropTypes.func.isRequired
};

export default ProductsList;