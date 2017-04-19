import React from 'react';
import {render} from 'react-dom';
import MainPage from './component/Main';

render(
    <div>
        <MainPage/>
    </div>,
    document.body.appendChild(document.createElement('div'))
);