/**
 * Created by admin on 2017/4/23.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';

import Test from './components/Test';

import './styles/app.css';

render(
    <div>
        <Test/>
    </div>,
    document.querySelector("#root")
);

