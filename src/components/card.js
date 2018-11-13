import React, { Component } from 'react';
import GithubApiInterface from './../githubApiInterface';

export default class Card extends Component {
    constructor(props){
        super(props);
        this.data = this.props.data;
        this.state={
            content: "",
            link: "",
            userlink: "",
            imageLink: "",
            userName: "",
            repoName: "",
            numForks: "",
            numStars: "",
            repoLink: ""
        };
    }

    componentDidMount(){
        this.parseData(this.data);
    }

    parseData(response){
        this.setState({
            imageLink: response.owner.avatar_url,
            imageLink: response.owner.avatar_url,
            userlink: response.owner.html_url,
            userName: response.owner.login,
            repoName: response.name,
            numForks: response.forks_count,
            numStars: response.stargazers_count,
            repoLink: response.html_url,
            content: response.description,
            link:["https://www.github.com", response.owner.login, response.name,].join('/')
        })
    }

    render(){
            return (
            <div>
                <div className={["github-card","repo-card"].join(' ')}>
                    <div className={["header"]}>
                        <a className={"avatar"} href={this.state.userlink} target={"_top"}>
                            <img src={this.state.imageLink} alt={this.state.userName}/>
                        </a>
                        <h1><a className={"wordwrap"} href={this.state.link} target={"_top"}>{this.state.repoName}</a></h1>
                    </div>
                        <div className={"content"}>
                        <p>{this.state.content}</p>
                    </div>
                    <ul className={"status"}>
                        <li>
                            <a href={[this.state.link, "/network"].join('')} target="_top">
                                <strong>{this.state.numForks}</strong>
                                Forks
                            </a>
                        </li>
                        <li>
                            <a href={[this.state.link, "/stargazers"].join('')} target="_top">
                                <strong>{this.state.numStars}</strong>
                                Stars
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}
