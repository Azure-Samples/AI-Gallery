var $ = require("jquery");
const widget = require('./../src/widget');
<<<<<<< HEAD
jest.mock('./../src/jsonHelper');
=======
jest.mock('./../src/githubApiInterface');
>>>>>>> master

test('Make sure constructURL method constructs the right url', () =>{
    var expectedURL = "https://api.github.com/search/repositories?q=user:Microsoft+user:Azure+user:Azure-Samples+topic:iot&sort=stars&per_page=40";
    expect(widget.constructURL('iot', ['Microsoft', 'Azure', 'Azure-Samples'])).toBe(expectedURL);
});

test('make sure topRepos sorts as intended and only returns 5 repositories', () => {
    var repo1 = {
        name: 1,
        stargazers_count:1,
        language: "html",
        html_url: "repo1",
        topic: "test"
    };
    var repo2 ={
        name: 2,
        stargazers_count:2,
        language: "html",
        html_url: "repo2",
        topic: "test"
    };
    var repo3 ={
        name: 3,
        stargazers_count:3,
        language: "html",
        html_url: "repo3",
        topic: "test"
    };
    var repo4 ={
        name: 4,
        stargazers_count:4,
        language: "html",
        html_url: "repo4",
        topic: "test"
    };
    var repo5 ={
        name: 5,
        stargazers_count:5,
        language: "html",
        html_url: "repo5",
        topic: "test"
    };
    var repo6 ={
        name: 6,
        stargazers_count:6,
        language: "html",
        html_url: "repo6",
        topic: "test"
    };
    var repos = [repo1, repo3, repo4, repo6,repo5, repo2];

    repos = widget.topRepos(repos);

    expect(repos.length).toBe(5);
    expect(repos[0].stars).toBe(6);
    expect(repos[3].stars).toBe(3);
});

test('check to make sure getJSON is using mocked version', () => {
<<<<<<< HEAD
    const jsonHelper = require('./../src/jsonHelper');
    console.log(jsonHelper.getJSON('someurl', function(){return null}));
=======
    const githubApiInterface = require('./../src/githubApiInterface');
    console.log(githubApiInterface.getJSON('someurl', function(){return null}));
>>>>>>> master
});

test('check that cleanseKeyword correctly manipulates the keyword', () => {
    var testString = "hello world"
    var expectedString = "topic:hello+topic:world"
    expect(widget.cleanseKeyword(testString)).toBe(expectedString);
})