const orgs = ['Microsoft', 'Azure', 'Azure-Samples'];


var widget = {
    accounts:[],

    init:(accounts) => {
        $(document).ready(function() {
            document.getElementById('btnSearch').addEventListener("click", widget.restart);
            widget.accounts = accounts;
            console.log("init: " + widget.accounts);
            widget.start();
        })
    },

    appendToWidget:(parentSelector, tag, classes, html) => {
        var parentNode = document.querySelector(parentSelector);
        var childNode = document.createElement(tag);
        childNode.innerHTML = html;
        childNode.className += classes;
        parentNode.appendChild(childNode);
    },


    getJSON:(url, callback) => {
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
    },

    restart:() => {
        document.getElementById('search_widget0').innerHTML = '';
        widget.start();
    },

    start:() => {
        widget.appendToWidget("body", "style", "", "@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);.gh-widget-link,.gh-widget-link:hover{text-decoration:none}.gh-widget-container{display:flex;flex-direction:row;flex-wrap:no-wrap;align-items:center;justify-content:center;color:#333;font-family:'Noto Sans',sans-serif}.gh-widget-personal-details .bio,.gh-widget-stats .count{color:#4078C0}.github-widget{border:1px solid #DDD;max-width:350px}.gh-widget-item{flex:1;text-align:center;padding:10px}.gh-widget-repositories .language{text-align:left}.gh-widget-repositories .language div,.gh-widget-repositories .stars div{padding:5px 0}.gh-widget-photo{flex:2}.gh-widget-photo img{border-radius:100%;max-width:90px}.gh-widget-personal-details{flex:6}.gh-widget-personal-details .full-name{font-size:1.5em;line-height:1.5em}.gh-widget-personal-details .location{font-size:.8em}.gh-widget-stats .count{font-size:1.2em;font-weight:700}.gh-widget-repositories .names{flex:2;text-align:left}.gh-widget-repositories .names div{padding:5px 0;text-overflow:ellipsis}.gh-widget-follow{flex:2}.gh-widget-active-time{flex:4;font-size:.8em}.gh-widget-heading{font-weight:400;color:#666}.gh-widget-hr{border:1px solid #DDD}.gh-widget-link{color:#4078C0}.gh-widget-follow button{width:100%;height:2em;border:none;background:#ddd}.gh-widget-topic{display:inline-block;padding:0.3em 0.9em;margin:0 0.5em 0.5em 0;background-color:#f1f8ff;border-radius:3px;float:left;font-size:12px !important;height:50px;verital-align:middle;text-align:center}");
        console.log("start: " + widget.accounts);

        var widgets = document.querySelectorAll('.github-widget');
        for (var i = 0; i < widgets.length; i++) {
            var parentNode = widgets[i];
            var type = parentNode.dataset.type;
            var widget_name =  type + "_widget" + i;
            
            // get input depending on the type
            var keyword = "";
            if (type === "search")
            {
                keyword = document.getElementById('keyword').value;
            }
            else
            {
                keyword = parentNode.dataset.browsetopic;
            }

            parentNode.setAttribute("id", widget_name);
            widget.appendToWidget("#" + widget_name, "div", "", '<div class="gh-widget-container"><div class="gh-widget-item gh-widget-photo"></div><div class="gh-widget-item gh-widget-personal-details"></div></div><div class="gh-widget-container gh-widget-stats"></div><hr class="gh-widget-hr"><div class="gh-widget-container"><div class="gh-widget-item gh-widget-heading">Top repositories for "' + keyword + '"</div></div><div class="gh-widget-repositories"></div><div class="gh-widget-container"><div class="gh-widget-item gh-widget-follow"></div><div class="gh-widget-item gh-widget-active-time"></div></div>')

            widget.fetchRepos(keyword, "#" + widget_name,);
        }
    },

    constructURL:(keyword, users) => {
        var url = "https://api.github.com/search/repositories?q=";
        for(i in users)
        {
            url = url + "user:" + users[i];
        }
        url = url + "topic:" + keyword + "&sort=stars&per_page=40";

        return url;
    },
    
    fetchRepos:(keyword, widgetId, orgs) => {
        widget.getJSON(constructURL(keyword, orgs), function(response) {
            widget.updateRepoDetails(widget.topRepos(response), widgetId);
            widget.updateLastPush(widget.lastPushedDay(response), widgetId);
        });
    },

    updateLastPush:(lastDay, widgetId) => {
        widget.appendToWidget(widgetId + " .gh-widget-active-time", "span", "", 'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today'));
    },

    lastPushedDay:(repos) => {
        var now = new Date();
        var latestDate;
        var difference = 9999999999999;
        for (var i = 0; i < repos.length; i++) {
            var pushedDate = new Date(repos[i].pushed_at)
            if (now - pushedDate < difference) {
                latestDate = pushedDate;
                difference = now - pushedDate;
            }
        }
        return Math.floor((now - latestDate) / (1000 * 3600 * 24));
    },

    updateRepoDetails:(repos, widgetId) => {
        for (var i = 0; i < repos.length; i++) {
            var language = repos[i].language ? repos[i].language : "Unknown";
            widget.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", '<div class="gh-widget-item names"><div><a class="gh-widget-link" href="' + repos[i].repoUrl + '">' + repos[i].name + '</a></div></div><div class="gh-widget-item language"><div>' + language + '</div></div><div class="gh-widget-item stars"><div>&#9733;' + repos[i].stars + '</div></div>');
            
            var topic_divs = '';
            for (var j=0; j < repos[i].topics.length && j < 3; j++)
            {
                topic_divs += '<div class="gh-widget-topic">' + repos[i].topics[j] + '</div>';
            }
            widget.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", topic_divs);
        }
    },

    topRepos:(repos) => {
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
}

module.exports = widget;