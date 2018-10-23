var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

content.getContent(['models', 'examples']);

$(document).ready(function (){
    widget.init(['azure-samples', 'azure', 'microsoft']);
    browse.init(document.getElementsByClassName('browsebtn'), function(){browse.restart(keyword)});
})
