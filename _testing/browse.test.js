var $ = require("jquery");
<<<<<<< HEAD
const browse = require('./../src/browse');



test('Make sure that all results from test are within the approved orgs: Microsoft, Azure, Azure-Samples', () =>{
    const func = jest.fn(value => {return value});
    var url = "https://api.github.com/search/repositories?q=user:azure-samples+user:microsoft+user:azure+topic:iot&sort=stars&per_page=1000";
    var json = browse.getJSON(url, func)

    expect(json).not.toBeNull();
    console.log(json);
})


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

    repos = browse.topRepos(repos);

    expect(repos.length).toBe(5);
    expect(repos[0].stars).toBe(6);
    expect(repos[3].stars).toBe(3);
})
=======

/*
test('Test that browse buttons work on click', () => {
    //Set up document body
    document.body.innerHTML = +
        '<div>' + 
            '<button id="OnnxSearch">' +
            '<button id="TensorFlow">' +
            '<div class="github-widget" id="browse_widget1" data-type="browse" data-browseTopic="onnx">Some Content</div>' +
        '</div>';
        
    const browse = require('./../src/browse');
    browse.restart = jest.fn().mockImplementation(() => console.log("MOCKED"));
    const init = browse.init();

    $('#OnnxSearch').click();

    expect(browse.restart).toBeCalledTimes(1);
    expect($('#browse_widget1').text()).not.toEqual('Some Content');
    console.log(document.body.innerHTML);
    console.log($('#browse_widget1').text());

});
*/

test()
>>>>>>> jekrame/discoverability
