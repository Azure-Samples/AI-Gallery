import React, { Component } from 'react';
import { render } from 'react-dom';
import SliderContent from './sliderContent';
import githubApiInterface from './../githubApiInterface';


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
        return <li href={r.repoUrl}> <ul> <li>{r.name}</li><li>{r.stars}</li><li>{r.language}</li><li>{r.topics}</li></ul></li>
    }

    render(){
            return (
            <ul>
                {this.repos.map(this.displayResults(r))}
            </ul>
        )
    }

}
