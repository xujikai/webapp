/**
 * Created by admin on 2017/4/8.
 */
import React,{Component} from 'react';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';

class App extends Component{

    render(){
        return(
            <div>
                <h2>Shopping Cart Example</h2>
                <hr/>
                <ProductsContainer/>
                <hr/>
                <CartContainer/>
            </div>
        );
    }

}

export default App;