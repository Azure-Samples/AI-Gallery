import React, { Component } from 'react';
import githubApiInterface from './../githubApiInterface';


export default class searchWidget extends Component {
    constructor(props){
        super(props);
        this.key = this.props.keyword;
        this.users = ['Azure', 'Azure-Samples', 'Microsoft'];
        this.refresh = true;
        this.state={
            repos: [],
            refreshList: false
        };
    }

    componentDidMount(){
        this.fetchRepos(this.key, this.users);
    }

    componentDidUpdate(prevProps){
        if(this.props.keyword !== prevProps.keyword){
            this.setState({
                repos: []
            })
            this.key=this.props.keyword;
            this.fetchRepos(this.props.keyword, this.users);
        }

    }

    cleanseKeyword(keyword){
        return (keyword == '') ? "topic:gallery" : "topic:gallery+topic:" + keyword.replace(/ /g, "+topic:");
    }

    constructURL(keyword, users){
        var url = "https://api.github.com/search/repositories?q=";
        for(var i in users)
        {
            url = url + "user:" + users[i] + "+";
        }
        url = url + this.cleanseKeyword(keyword) + "&sort=stars&per_page=40";
        return url;
    }
    
    fetchRepos(keyword, orgs){
        return githubApiInterface.getJSON(this.constructURL(keyword, orgs), (response) => {this.topRepos(response)});
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
                topics: repo.topics,
                image: repo.owner.avatar_url,
                username: repo.owner.login
            });
        }
        this.setState({
            repos: result
        });
        return result;
    }

    refreshList(){
        this.setState({refreshList: !this.state.refreshList});
    }

    displayResults(r, i){
        var topics = [];
        for (var i=0; i < r.topics.length && i < 6; i++){
            topics.push(<div className={["repo-topic","repo-attr"].join(' ')}>{r.topics[i]}</div>);
        };
        var html =  <li key={i} className={"gh-item"}> 
                            <div className={"gh-frame"}> 
                                <ul className={"repo-info-frame"}>
                                    <li className={"repo-img repo-attr"}><img src={r.image} alt={r.username} width={"30px"} height={"30px"}/></li>
                                    <li className={"repo-name repo-attr"}><a href={r.repoUrl} target={"_blank"} className={"standardLink"}>{r.name}</a></li> 
                                    <li className={"repo-lang repo-attr"}>{r.language}</li> 
                                    <li className={"repo-stars repo-attr"}>&#9734;{r.stars}</li> 
                                </ul>
                                <div className={"repo-topic-container"}>
                                    {topics.map((t) => {return t})}
                                </div>
                            </div>
                    </li>;
        return html;
    }

    render(){
        var result = this.state.repos.map((item, index) => this.displayResults(item, index))
            return (
                <div className="gh-list">
                    <h3>Current Topic: '{this.key}'</h3>
                    <ul classname={"gh-frame-container"}>
                        {result}
                    </ul>
                </div>
        )
    }
}
