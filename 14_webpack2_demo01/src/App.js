/**
 * Created by admin on 2017/4/23.
 */

const moment = require('moment');

import './styles/app.css';

function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = 'hello world App';

    console.log(moment().format());

    return element;
}

document.body.appendChild(component());

function determineDate() {
    import('moment')
        .then(moment => moment().format('LLLL'))
        .then(str => console.log(str))
        .catch(err => console.log('Failed to load moment', err));
}

determineDate();