const githubApiInterface = jest.genMockFromModule('./../githubApiInterface');

function getJSON(url, callback) {
    return {"success":"true"};
}

githubApiInterface.getJSON = getJSON;

module.exports = githubApiInterface;