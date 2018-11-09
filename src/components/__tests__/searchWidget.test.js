import React from 'react';
import { shallow, configure } from 'enzyme';
import SearchWidget from './../searchWidget';
import GithubApiInterface from './../../githubApiInterface';
import ReactDOMServer from 'react-dom/server';
import Adapter from 'enzyme-adapter-react-16';

var $ = require("jquery");
jest.mock('./../../githubApiInterface');
configure({ adapter: new Adapter() });

test('Make sure constructURL method constructs the right url', () =>{
    const wrapper = shallow(<SearchWidget keyword={"iot"}/>);
    var expectedURL = "https://api.github.com/search/repositories?q=user:Azure+user:Azure-Samples+user:Microsoft+topic:iot&sort=stars&per_page=40";
    expect(wrapper.instance().constructURL("iot", ["Azure", "Azure-Samples", "Microsoft"])).toBe(expectedURL);
});

test('make sure topRepos sorts as intended and only returns 5 repositories', () => {
    const wrapper = shallow(<SearchWidget keyword={'iot'}/>);
    
    var repo1 = {
        name: "1",
        stargazers_count:1,
        language: "html",
        html_url: "repo1",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repo2 ={
        name: "2",
        stargazers_count:2,
        language: "html",
        html_url: "repo2",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repo3 ={
        name: "3",
        stargazers_count:3,
        language: "html",
        html_url: "repo3",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repo4 ={
        name: "4",
        stargazers_count:4,
        language: "html",
        html_url: "repo4",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repo5 ={
        name: "5",
        stargazers_count:5,
        language: "html",
        html_url: "repo5",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repo6 ={
        name: "6",
        stargazers_count:6,
        language: "html",
        html_url: "repo6",
        topic: "test",
        owner:{
            avatar_url: "test",
            login: "test"
        },
        topics:["1","2"]
    };
    var repos = [repo1, repo3, repo4, repo6,repo5, repo2];
    
    repos = wrapper.instance().topRepos(repos);

    expect(repos.length).toBe(5);
    expect(repos[0].stars).toBe(6);
    expect(repos[3].stars).toBe(3);
});

test('check that cleanseKeyword correctly manipulates the keyword', () => {
    const wrapper = shallow(<SearchWidget keyword={'iot'}/>);
    var testString = "hello world"
    var expectedString = "topic:hello+topic:world"
    expect(wrapper.instance().cleanseKeyword(testString)).toBe(expectedString);
})

test('check that displayResults returns the correct list item format', () => {
    var repo1 = {
        name: "name",
        stars:1,
        language: "html",
        repoUrl: "repo1",
        topics: "test"
    };
    var expected = "<li class=\"gh-item\"><div class=\"gh-frame\"><ul class=\"repo-info-frame\"><li class=\"repo-img repo-attr\"><img width=\"30px\" height=\"30px\"/></li><li class=\"repo-name repo-attr\">name</li><li class=\"repo-lang repo-attr\">html</li><li class=\"repo-stars repo-attr\">☆1</li></ul><div class=\"repo-topic-container\"><div class=\"repo-topic repo-attr\">t</div><div class=\"repo-topic repo-attr\">e</div><div class=\"repo-topic repo-attr\">s</div><div class=\"repo-topic repo-attr\">t</div></div></div></li>"
    const wrapper = shallow(<SearchWidget  keyword={'iot'}/>);
    expect(ReactDOMServer.renderToStaticMarkup(wrapper.instance().displayResults(repo1))).toMatch(expected);
})