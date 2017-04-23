import React from 'react';
import {render} from 'react-dom';

import TestTextPage from './components/TestTextPage.jsx';

render(
    <div>
        <TestTextPage/>
    </div>,
    document.querySelector('#root')
);