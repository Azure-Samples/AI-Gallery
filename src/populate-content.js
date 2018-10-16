function fetchContent(keyword) {
    var jsonString = getData();
    var json = JSON.parse(jsonString);
    var elementid = keyword + '-menu';
    json[keyword].forEach(function (element) {
        var card = document.createElement('li');
        card.className = keyword + 'item item';
        card.innerHTML = '<div class="github-card" data-github="' + element["link"] + '" data-theme="medium"></div>';
        document.getElementById(elementid).appendChild(card);
    });
}
;
