/**
 * Created by admin on 2017/4/23.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';

import '../styles/test.less';

render(
    <div>
        哈哈哈
        <img src={require('../asserts/bg.jpg')}/>
    </div>,
    document.body.appendChild(document.createElement('div'))
);
