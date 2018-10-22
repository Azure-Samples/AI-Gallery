var content = require('./populate-content');
var widget = require('./widget');
var browse = require('./browse');

content.getContent(['models', 'examples']);

$(document).ready(function (){
    console.log('trying to initialize widget');
    widget.init(['azure-samples', 'azure', 'microsoft']);

    console.log('trying to initialize browse');
    browse.init(document.getElementsByClassName('browsebtn'), function(){browse.restart(keyword)});
})
