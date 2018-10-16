/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/browse.js":
/*!***********************!*\
  !*** ./src/browse.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browse = {
    init: function init() {
        $(document).ready(function () {
            document.getElementById('OnnxSearch').addEventListener("click", function () {
                browse.restart("onnx");
            });
            document.getElementById('TensorflowSearch').addEventListener("click", function () {
                browse.restart("TensorFlow");
            });
        });
    },

    restart: function restart(keyword) {
        document.getElementById('browse_widget1').innerHTML = '';
        browse.start(keyword);
    },

    start: function start(keyword) {
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

    appendToWidget: function appendToWidget(parentSelector, tag, classes, html) {
        var parentNode = document.querySelector(parentSelector);
        var childNode = document.createElement(tag);
        childNode.innerHTML = html;
        childNode.className += classes;
        parentNode.appendChild(childNode);
    },

    fetchRepos: function fetchRepos(keyword, widgetId) {
        var url = "https://api.github.com/search/repositories?q=topic:" + keyword + "&sort=stars&per_page=1000";
        browse.getJSON(url, function (response) {
            browse.updateRepoDetails(browse.topRepos(response), widgetId);
            browse.updateLastPush(browse.lastPushedDay(response), widgetId);
        });
    },

    getJSON: function getJSON(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
        request.onload = function () {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                callback(data.items);
            }
        };
        request.send();
    },

    updateLastPush: function updateLastPush(lastDay, widgetId) {
        browse.appendToWidget(widgetId + " .gh-widget-active-time", "span", "", 'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today'));
    },

    lastPushedDay: function lastPushedDay(repos) {
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

    updateUserDetails: function updateUserDetails(user, widgetId) {
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

    updateRepoDetails: function updateRepoDetails(repos, widgetId) {
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

    topRepos: function topRepos(repos) {
        repos.sort(function (a, b) {
            if (a.stargazers_count === b.stargazers_count) {
                return 0;
            } else if (a.stargazers_count > b.stargazers_count) {
                return -1;
            } else {
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
};

module.exports = browse;

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
    getData: function getData() {
        var data = JSON.stringify({
            "models": [{
                "link": "onnx/models"
            }, {
                "link": "onnx/models"
            }, {
                "link": "onnx/models"
            }, {
                "link": "onnx/models"
            }, {
                "link": "onnx/models"
            }, {
                "link": "onnx/models"
            }],
            "examples": [{
                "link": "Azure/MachineLearningSamples-PredictiveMaintenance"
            }, {
                "link": "Azure/MachineLearningSamples-SentimentAnalysis"
            }, {
                "link": "Azure/MachineLearningSamples-ChurnPrediction"
            }, {
                "link": "Azure/MachineLearningSamples-BiomedicalEntityExtraction"
            }, {
                "link": "Azure/MachineLearningSamples-QnAMatching"
            }, {
                "link": "Azure/MachineLearningSamples-AerialImageClassification"
            }]
        });
        return data;
    }
};

module.exports = config;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(/*! ./populate-content */ "./src/populate-content.js");
var widget = __webpack_require__(/*! ./widget */ "./src/widget.js");
var browse = __webpack_require__(/*! ./browse */ "./src/browse.js");

content.getContent('models');
content.getContent('examples');
widget.init();
browse.init();

/***/ }),

/***/ "./src/populate-content.js":
/*!*********************************!*\
  !*** ./src/populate-content.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(/*! ./config */ "./src/config.js");

var content = {
    prepareContent: function prepareContent(keyword) {
        var jsonString = config.getData();
        var json = JSON.parse(jsonString);
        var cards = [];
        for (var i = 0; json[keyword] != undefined && i < json[keyword].length; i++) {
            var obj = json[keyword][i];
            var card = document.createElement('li');
            card.className = keyword + 'item item';
            card.innerHTML = '<div class="github-card" data-github="' + obj['link'] + '" data-width="250" data-height="350" data-theme="medium"></div>';
            cards.push(card);
        };
        return cards;
    },

    getContent: function getContent(keyword) {
        $(document).ready(function () {
            var elementid = keyword + '-menu';
            var cards = content.prepareContent(keyword);
            for (var i = 0; i < cards.length; i++) {
                document.getElementById(elementid).appendChild(cards[i]);
                console.log(cards[i].innerHTML);
            };
        });
    }

};

module.exports = content;

/***/ }),

/***/ "./src/widget.js":
/*!***********************!*\
  !*** ./src/widget.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var widget = {

    init: function init() {
        $(document).ready(function () {
            document.getElementById('btnSearch').addEventListener("click", widget.restart);
            widget.start();
        });
    },

    appendToWidget: function appendToWidget(parentSelector, tag, classes, html) {
        var parentNode = document.querySelector(parentSelector);
        var childNode = document.createElement(tag);
        childNode.innerHTML = html;
        childNode.className += classes;
        parentNode.appendChild(childNode);
    },

    getJSON: function getJSON(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
        request.onload = function () {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                callback(data.items);
            }
        };
        request.send();
    },

    restart: function restart() {
        document.getElementById('search_widget0').innerHTML = '';
        widget.start();
    },

    start: function start() {
        widget.appendToWidget("body", "style", "", "@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);.gh-widget-link,.gh-widget-link:hover{text-decoration:none}.gh-widget-container{display:flex;flex-direction:row;flex-wrap:no-wrap;align-items:center;justify-content:center;color:#333;font-family:'Noto Sans',sans-serif}.gh-widget-personal-details .bio,.gh-widget-stats .count{color:#4078C0}.github-widget{border:1px solid #DDD;max-width:350px}.gh-widget-item{flex:1;text-align:center;padding:10px}.gh-widget-repositories .language{text-align:left}.gh-widget-repositories .language div,.gh-widget-repositories .stars div{padding:5px 0}.gh-widget-photo{flex:2}.gh-widget-photo img{border-radius:100%;max-width:90px}.gh-widget-personal-details{flex:6}.gh-widget-personal-details .full-name{font-size:1.5em;line-height:1.5em}.gh-widget-personal-details .location{font-size:.8em}.gh-widget-stats .count{font-size:1.2em;font-weight:700}.gh-widget-repositories .names{flex:2;text-align:left}.gh-widget-repositories .names div{padding:5px 0;text-overflow:ellipsis}.gh-widget-follow{flex:2}.gh-widget-active-time{flex:4;font-size:.8em}.gh-widget-heading{font-weight:400;color:#666}.gh-widget-hr{border:1px solid #DDD}.gh-widget-link{color:#4078C0}.gh-widget-follow button{width:100%;height:2em;border:none;background:#ddd}.gh-widget-topic{display:inline-block;padding:0.3em 0.9em;margin:0 0.5em 0.5em 0;background-color:#f1f8ff;border-radius:3px;float:left;font-size:12px !important;height:50px;verital-align:middle;text-align:center}");

        var widgets = document.querySelectorAll('.github-widget');
        for (var i = 0; i < widgets.length; i++) {
            var parentNode = widgets[i];
            var type = parentNode.dataset.type;
            var widget_name = type + "_widget" + i;

            // get input depending on the type
            var keyword = "";
            if (type === "search") {
                keyword = document.getElementById('keyword').value;
            } else {
                keyword = parentNode.dataset.browsetopic;
            }

            parentNode.setAttribute("id", widget_name);
            widget.appendToWidget("#" + widget_name, "div", "", '<div class="gh-widget-container"><div class="gh-widget-item gh-widget-photo"></div><div class="gh-widget-item gh-widget-personal-details"></div></div><div class="gh-widget-container gh-widget-stats"></div><hr class="gh-widget-hr"><div class="gh-widget-container"><div class="gh-widget-item gh-widget-heading">Top repositories for "' + keyword + '"</div></div><div class="gh-widget-repositories"></div><div class="gh-widget-container"><div class="gh-widget-item gh-widget-follow"></div><div class="gh-widget-item gh-widget-active-time"></div></div>');

            widget.fetchRepos(keyword, "#" + widget_name);
        }
    },

    fetchRepos: function fetchRepos(keyword, widgetId) {
        var url = "https://api.github.com/search/repositories?q=topic:" + keyword + "&sort=stars&per_page=1000";
        widget.getJSON(url, function (response) {
            widget.updateRepoDetails(widget.topRepos(response), widgetId);
            widget.updateLastPush(widget.lastPushedDay(response), widgetId);
        });
    },

    fetchUserDetails: function fetchUserDetails(username, widgetId) {
        var url = "https://api.github.com/users/" + username;
        widget.getJSON(url, function (response) {
            widget.updateUserDetails(response, widgetId);
        });
    },

    updateLastPush: function updateLastPush(lastDay, widgetId) {
        widget.appendToWidget(widgetId + " .gh-widget-active-time", "span", "", 'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today'));
    },

    lastPushedDay: function lastPushedDay(repos) {
        var now = new Date();
        var latestDate;
        var difference = 9999999999999;
        for (var i = 0; i < repos.length; i++) {
            var pushedDate = new Date(repos[i].pushed_at);
            if (now - pushedDate < difference) {
                latestDate = pushedDate;
                difference = now - pushedDate;
            }
        }
        return Math.floor((now - latestDate) / (1000 * 3600 * 24));
    },

    updateUserDetails: function updateUserDetails(user, widgetId) {

        widget.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "full-name", user.name);
        if (user.bio) {
            widget.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "bio", user.bio);
        }
        if (user.location) {
            widget.appendToWidget(widgetId + " .gh-widget-personal-details", "div", "location", '&#9906; ' + user.location);
        }
        widget.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.followers + '</div><div class="stat-name">Followers</div>');
        widget.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.following + '</div><div class="stat-name">Following</div>');
        widget.appendToWidget(widgetId + " .gh-widget-stats", "div", "gh-widget-item", '<div class="count">' + user.public_repos + '</div><div class="stat-name">Repositories</div>');
        widget.appendToWidget(widgetId + " .gh-widget-photo", "span", "", '<img src="' + user.avatar_url + '">');
        widget.appendToWidget(widgetId + " .gh-widget-follow", "button", "", '<a class="gh-widget-link" target="new" href="' + user.html_url + '">Follow</a>');
    },

    updateRepoDetails: function updateRepoDetails(repos, widgetId) {
        for (var i = 0; i < repos.length; i++) {
            var language = repos[i].language ? repos[i].language : "Unknown";
            widget.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", '<div class="gh-widget-item names"><div><a class="gh-widget-link" href="' + repos[i].repoUrl + '">' + repos[i].name + '</a></div></div><div class="gh-widget-item language"><div>' + language + '</div></div><div class="gh-widget-item stars"><div>&#9733;' + repos[i].stars + '</div></div>');

            var topic_divs = '';
            for (var j = 0; j < repos[i].topics.length && j < 3; j++) {
                topic_divs += '<div class="gh-widget-topic">' + repos[i].topics[j] + '</div>';
            }
            widget.appendToWidget(widgetId + " .gh-widget-repositories", "div", "gh-widget-container", topic_divs);
        }
    },

    topRepos: function topRepos(repos) {
        repos.sort(function (a, b) {
            if (a.stargazers_count === b.stargazers_count) {
                return 0;
            } else if (a.stargazers_count > b.stargazers_count) {
                return -1;
            } else {
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
};

module.exports = widget;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map