var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

content.getContent(['models', 'examples']);

$(document).ready(function (){
    widget.init();
    browse.init(document.getElementsByClassName('browsebtn'), function(){browse.restart(keyword)});
})
