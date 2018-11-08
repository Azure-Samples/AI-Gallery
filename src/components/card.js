import React, { Component } from 'react';
import GithubApiInterface from './../githubApiInterface';

export default class Card extends Component {
    constructor(props){
        super(props);
        this.data = this.props.data;
        this.link;
        this.userlink;
        this.imageLink;
        this.username;
        this.repoName;
        this.numForks;
        this.numStars;
        this.repoLink;
    }

    componentDidMount(){
        this.parseData(this.data);
        //
    }

    parseData(response){
        console.log(response);
        this.imageLink = response.owner.avatar_url;
        this.userlink = response.owner.html_url;
        this.userName = response.owner.login;
        this.repoName = response.name;
        this.numForks = response.forks_count;
        this.numStars = response.stargazers_count;
        this.repoLink = response.html_url;
        this.link = [this.username, this.repoName].join('/');

        console.log("imagelink: " + this.imageLink);
        console.log("userlink: " + this.userlink);
        console.log("Card 1: \n" [this.imageLink, this.userlink, this.userName, this.repoName, this.numForks, this.numStars, this.repoLink, this.link].join('"\n"'));
    }

    render(){
            return (
            <div>
                <div className={["github-card","repo-card"].join(' ')}>
                    <div className={["header"]}>
                        <a className={"avatar"} href={this.userlink} target={"_top"}>
                            <img src={this.imageLink} alt={this.userName}/>
                        </a>
                        <h1><a href={this.link} target={"_top"}>{this.repoName}</a></h1>
                    </div>
                </div>
                <div className={"content"}>
                    <p>{this.content}</p>
                </div>
                <ul className={"status"}>
                    <li>
                        <a href={[this.link, "/network"].join('')} target="_top">
                            <strong>{this.numForks}</strong>
                            "Forks"
                        </a>
                    </li>
                    <li>
                        <a href={[this.link, "/stargazers"].join('')} target="_top">
                            <strong>{this.numStars}</strong>
                            "Stars"
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

}
