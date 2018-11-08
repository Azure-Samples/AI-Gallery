var widget = require('./widget');
import { render } from 'react-dom';
import React from 'react';
import Browse from './components/browse';
import Search from './components/search';
import Examples from './components/examples';
import Models from './components/models';

$(document).ready(function (){
    render(<Browse />, document.getElementById('browse'));
    render(<Search />, document.getElementById('search'));
    render(<Examples />, document.getElementById('examples-container'));
    render(<Models />, document.getElementById('models-container'));
    
    var cardWidget = require('./card-widget');

    widget.init();
});
