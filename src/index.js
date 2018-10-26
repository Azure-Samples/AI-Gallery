var widget = require('./widget');


$(document).ready(function (){
    var search = require('./components/search');
    var browse = require('./components/browse');
    var model = require('./components/models');
    var example = require('./components/examples');

    widget.init();
    var cardWidget = require('./card-widget');
    var content = require('./populate-content');

    var contentScroller = require('./content-scroller');
});
