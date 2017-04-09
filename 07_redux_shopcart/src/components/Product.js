/**
 * Created by admin on 2017/4/8.
 */
import React,{PropTypes} from 'react';

const Product = ({title,price,quantity}) => (
    <div>
        {title} - &#36;{price}{quantity > 0 ? ` x ${quantity}` : null}
    </div>
);

Product.propTypes = {
    title:PropTypes.string,
    price:PropTypes.number,
    quantity:PropTypes.number
};

export default Product;