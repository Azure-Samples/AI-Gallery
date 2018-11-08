const githubApiInterface = jest.genMockFromModule('./../githubApiInterface');

function getJSON(url, callback) {
    console.log('mocked');
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

githubApiInterface.getJSON = getJSON;

module.exports = githubApiInterface;