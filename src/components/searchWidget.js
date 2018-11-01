import React, { Component } from 'react';
import { render } from 'react-dom';
import githubApiInterface from './../githubApiInterface';


//TODO: Implement that Browse/Search use this instead of ./../widget.js
export default class searchWidget extends Component {
    constructor(props){
        super(props);
        this.keyword = props.keyword;
        this.users = ['Azure', 'Azure-Samples', 'Microsoft'];
        this.repos = this.fetchRepos(this.keyword, this.users);
    }

    cleanseKeyword(keyword){
        return "topic:" + keyword.replace(/ /g, "+topic:");
    }

    constructURL(){
        var url = "https://api.github.com/search/repositories?q=";
        for(var i in this.users)
        {
            url = url + "user:" + this.users[i] + "+";
        }
        url = url + this.cleanseKeyword(this.keyword) + "&sort=stars&per_page=40";

        return url;
    }
    
    fetchRepos(keyword, orgs){
        //creates component with template return for unit testing
        if(keyword == "bypassFetch"){
            return [
                {
                    name: "1",
                    stargazers_count:1,
                    language: "html",
                    html_url: "repo1",
                    topic: "test"
                },
                {
                    name: "2",
                    stargazers_count:2,
                    language: "html",
                    html_url: "repo2",
                    topic: "test"
                }
            ];
        }
        return githubApiInterface.getJSON(this.constructURL(keyword, orgs), function(response) {this.topRepos(response)});
    }

    topRepos(repos){
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

    displayResults(r){
        return <li href={r.repoUrl} key={r.name}> <ul> <li>{r.name}</li><li>{r.stars}</li><li>{r.language}</li><li>{r.topics}</li></ul></li>
    }

    render(){
            return (
            <ul>
                {Array.isArray(this.repos) && this.repos.map((r) => this.displayResults(r))}
            </ul>
        )
    }

}
