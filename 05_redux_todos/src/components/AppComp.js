/**
 * Created by xxx on 2017/4/1.
 */
import React, {Component} from 'react';
import AddCont from '../containers/AddCont';
import ListCont from '../containers/ListCont';
import FooterComp from './FooterComp';

class App extends Component{

    render(){
        return (
            <div>
                <AddCont/>
                <ListCont/>
                <FooterComp/>
            </div>
        );
    }

}

export default App;