$('document').ready(function(){
    document.getElementById('OnnxSearch').addEventListener("click", function(){
        restart("onnx");});
    document.getElementById('TensorflowSearch').addEventListener("click", function(){
        restart("TensorFlow");});
})

function restart(keyword) {
    document.getElementById('browse_widget1').innerHTML = '';
    start(keyword);
}

function start(keyword) {
    var widgets = document.querySelectorAll('.github-widget');
    for (var i = 0; i < widgets.length; i++) {
        var parentNode = widgets[i];
        var type = parentNode.getAttribute("data-type");
        var widget_name =  type + "_widget" + i;
        
        // get input depending on the type
        if (type === "browse"){
            appendToWidget("#" + widget_name, "div", "", '<div class="gh-widget-container"><div class="gh-widget-item gh-widget-photo"></div><div class="gh-widget-item gh-widget-personal-details"></div></div><div class="gh-widget-container gh-widget-stats"></div><hr class="gh-widget-hr"><div class="gh-widget-container"><div class="gh-widget-item gh-widget-heading">Top repositories for "' + keyword + '"</div></div><div class="gh-widget-repositories"></div><div class="gh-widget-container"><div class="gh-widget-item gh-widget-follow"></div><div class="gh-widget-item gh-widget-active-time"></div></div>');
            fetchRepos(keyword, "#" + widget_name);
        }
    }
}

function appendToWidget(parentSelector, tag, classes, html) {
    var parentNode = document.querySelector(parentSelector);
    var childNode = document.createElement(tag);
    childNode.innerHTML = html;
    childNode.className += classes;
    parentNode.appendChild(childNode);
}

function fetchRepos(keyword, widgetId) {
    var url = "https://api.github.com/search/repositories?q=topic:" + keyword + "&sort=stars&per_page=1000";
    getJSON(url, function(response) {
        updateRepoDetails(topRepos(response), widgetId);
        updateLastPush(lastPushedDay(response), widgetId);
    });
}

function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
    request.onload = function() {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            callback(data.items);
        }
    };
    request.send();
}


function updateLastPush(lastDay, widgetId) {
    appendToWidget(widgetId + " .gh-widget-active-time", "span", "", 'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today'));
}


function lastPushedDay(repos) {
    var now = new Date();
    var latestDate;
    var difference = 9999999999999;
    for (var i = 0; i < repos.length; i++) {
        var pushedDate = new Date(repos[i].pushed_at)
        if (now.getTime() - pushedDate.getTime() < difference) {
            latestDate = pushedDate;
            difference = now.getTime() - pushedDate.getTime();
        }
    }
    return Math.floor((now.getTime() - latestDate.getTime()) / (1000 * 3600 * 24));
}


function updateUserDetails(user, widgetId) {

    appendToWidget(widgetId + " .gh-widget-personal-details", "div", "full-name", user.name);
    if (user.bio) {
        appendToWidget(widgetId + " .gh-widget-personal-details", "div", "bio", user.bio);
    }
    if (user.location) {
        appendToWidget(widgetId + " .gh-widget-personal-details", "div", "location", '&#9906; ' + user.location);
    }
    appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.followers + '</div><div class="stat-name">Followers</div>');
    appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.following + '</div><div class="stat-name">Following</div>');
    appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.public_repos + '</div><div class="stat-name">Repositories</div>');
    appendToWidget(widgetId + " .gh-widget-photo", "span", "", '<img src="' + user.avatar_url + '">');
    appendToWidget(widgetId + " .gh-widget-follow", "button", "", '<a class="gh-widget-link" target="new" href="' + user.html_url + '">Follow</a>')

}

function updateRepoDetails(repos, widgetId) {

    for (var i = 0; i < repos.length; i++) {
        var language = repos[i].language ? repos[i].language : "Unknown";
        appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", '<div class="gh-widget-item names"><div><a class="gh-widget-link" href="' + repos[i].repoUrl + '">' + repos[i].name + '</a></div></div><div class="gh-widget-item language"><div>' + language + '</div></div><div class="gh-widget-item stars"><div>&#9733;' + repos[i].stars + '</div></div>');
        
        var topic_divs = '';
        for (var j=0; j < repos[i].topics.length && j < 3; j++)
        {
            topic_divs += '<div class="gh-widget-topic">' + repos[i].topics[j] + '</div>';
        }
        appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", topic_divs);
    }

}

function topRepos(repos) {

    repos.sort(function(a, b) {
        if (a.stargazers_count === b.stargazers_count) {
            return 0;
        } else if (a.stargazers_count > b.stargazers_count) {
            return -1;
        } else {
            return 1;
        }
    })

    repos = repos.slice(0, 5);
    var result = [];
    for (var i in repos) {
        var repo = repos[i];
        result.push({
            name: repo.name,
            stars: repo.stargazers_count,
            language: repo.language,
            repoUrl: repo.html_url,
            topics: repo.topics
        });
    }
    return result;
}
