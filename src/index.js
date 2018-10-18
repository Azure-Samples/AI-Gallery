var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

content.getContent(['models', 'examples']);
widget.init();

$(document).ready(function (){
    browse.init(document.getElementsByClassName('browsebtn'), function(){browse.restart(keyword)});
})
