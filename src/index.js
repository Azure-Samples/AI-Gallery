var content = require('./populate-content');
var widget = require('./widget');

content.getContent(['models', 'examples']);

$(document).ready(function (){
    widget.init();
})
