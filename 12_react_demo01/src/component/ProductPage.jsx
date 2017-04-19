import React,{Component} from 'react';
import Header from './Header';
import ProductItem from './ProductItem';
import '../style/product.scss';

export default class ProductPage extends Component{

    render(){
        return (
            <div className="component_container product_container">
                <Header title="产品列表"/>
                <ul>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                </ul>
            </div>
        );
    }

}