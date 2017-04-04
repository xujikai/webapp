/**
 * Created by xxx on 2017/4/1.
 */
import React, {Component} from 'react';
import AddCont from '../containers/AddCont';
import ListCont from '../containers/ListCont';
import FooterComp from './FooterComp';
import UndoCont from '../containers/UndoCont';

class App extends Component{

    render(){
        return (
            <div>
                <AddCont/>
                <ListCont/>
                <FooterComp/>
                <UndoCont/>
            </div>
        );
    }

}

export default App;