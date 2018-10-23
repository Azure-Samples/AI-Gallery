var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

content.getContent(['models', 'examples']);
<<<<<<< HEAD
widget.init();

$(document).ready(function (){
=======

$(document).ready(function (){
    widget.init();
>>>>>>> jekrame/discoverability
    browse.init(document.getElementsByClassName('browsebtn'), function(){browse.restart(keyword)});
})
