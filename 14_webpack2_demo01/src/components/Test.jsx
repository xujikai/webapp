/**
 * Created by admin on 2017/4/23.
 */
import React,{Component} from 'react';

import '../styles/test.less';

export default class Test extends Component{
    render(){
        return(
            <div>
                哈哈哈
                <img src={require('../asserts/bg.jpg')}/>
            </div>
        )
    }
}
