var $ = require("jquery");

var browse = {
    init: () => {
    /* TODO: 
    init: (buttons, fn) => {
        for(var i = 0; i < buttons.length; i ++)
        {
            console.log(buttons[i]) 
            document.getElementById(buttons[i].id).addEventListener("click", function () {
                fn()
            })
        }*/
        $(document).ready(function() {
            document.getElementById('OnnxSearch').addEventListener("click", function () {
                browse.restart("onnx");
            });
            document.getElementById('TensorflowSearch').addEventListener("click", function () {
                browse.restart("TensorFlow");
            });
        })
    },

    restart:(keyword) => {
        document.getElementById('browse_widget1').innerHTML = '';
        browse.start(keyword);
    },

    start:(keyword) => {
        var widgets = document.querySelectorAll('.github-widget');
        for (var i = 0; i < widgets.length; i++) {
            var parentNode = widgets[i];
            var type = parentNode.getAttribute("data-type");
            var widget_name = type + "_widget" + i;
            // get input depending on the type
            if (type === "browse") {
                browse.appendToWidget("#" + widget_name, "div", "", '<div class="gh-widget-container"><div class="gh-widget-item gh-widget-photo"></div><div class="gh-widget-item gh-widget-personal-details"></div></div><div class="gh-widget-container gh-widget-stats"></div><hr class="gh-widget-hr"><div class="gh-widget-container"><div class="gh-widget-item gh-widget-heading">Top repositories for "' + keyword + '"</div></div><div class="gh-widget-repositories"></div><div class="gh-widget-container"><div class="gh-widget-item gh-widget-follow"></div><div class="gh-widget-item gh-widget-active-time"></div></div>');
                browse.fetchRepos(keyword, "#" + widget_name);
            }
        }
    },

    appendToWidget:(parentSelector, tag, classes, html) => {
        var parentNode = document.querySelector(parentSelector);
        var childNode = document.createElement(tag);
        childNode.innerHTML = html;
        childNode.className += classes;
        parentNode.appendChild(childNode);
    },

    fetchRepos:(keyword, widgetId) => {
        var url = "https://api.github.com/search/repositories?q=topic:" + keyword + "&sort=stars&per_page=1000";
        browse.getJSON(url, function (response) {
            browse.updateRepoDetails(browse.topRepos(response), widgetId);
            browse.updateLastPush(browse.lastPushedDay(response), widgetId);
        });
    },

    getJSON:(url, callback) => {
        var result
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
        request.onload = function () {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                result = data.items;
                callback(data.items);
            }
        };
        request.send();
    },

    updateLastPush:(lastDay, widgetId) => {
        browse.appendToWidget(widgetId + " .gh-widget-active-time", "span", "", 'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today'));
    },

    lastPushedDay:(repos) => {
        var now = new Date();
        var latestDate;
        var difference = 9999999999999;
        for (var i = 0; i < repos.length; i++) {
            var pushedDate = new Date(repos[i].pushed_at);
            if (now.getTime() - pushedDate.getTime() < difference) {
                latestDate = pushedDate;
                difference = now.getTime() - pushedDate.getTime();
            }
        }
        return Math.floor((now.getTime() - latestDate.getTime()) / (1000 * 3600 * 24));
    },

    updateUserDetails:(user, widgetId) => {
        browse.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "full-name", user.name);
        if (user.bio) {
            browse.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "bio", user.bio);
        }
        if (user.location) {
            browse.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "location", '&#9906; ' + user.location);
        }
        browse.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.followers + '</div><div class="stat-name">Followers</div>');
        browse.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.following + '</div><div class="stat-name">Following</div>');
        browse.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.public_repos + '</div><div class="stat-name">Repositories</div>');
        browse.appendToWidget(widgetId + " .gh-widget-photo", "span", "", '<img src="' + user.avatar_url + '">');
        browse.appendToWidget(widgetId + " .gh-widget-follow", "button", "", '<a class="gh-widget-link" target="new" href="' + user.html_url + '">Follow</a>');
    },

    updateRepoDetails:(repos, widgetId) => {
        for (var i = 0; i < repos.length; i++) {
            var language = repos[i].language ? repos[i].language : "Unknown";
            browse.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", '<div class="gh-widget-item names"><div><a class="gh-widget-link" href="' + repos[i].repoUrl + '">' + repos[i].name + '</a></div></div><div class="gh-widget-item language"><div>' + language + '</div></div><div class="gh-widget-item stars"><div>&#9733;' + repos[i].stars + '</div></div>');
            var topic_divs = '';
            for (var j = 0; j < repos[i].topics.length && j < 3; j++) {
                topic_divs += '<div class="gh-widget-topic">' + repos[i].topics[j] + '</div>';
            }
            browse.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", topic_divs);
        }
    },

    topRepos:(repos) => {
        repos.sort(function (a, b) {
            if (a.stargazers_count === b.stargazers_count) {
                return 0;
            }
            else if (a.stargazers_count > b.stargazers_count) {
                return -1;
            }
            else {
                return 1;
            }
        });
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
}

module.exports = browse;
