var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

    content.getContent('models');
    content.getContent('examples');
    widget.init();
    browse.init();