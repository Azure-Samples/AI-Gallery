const json = jest.genMockFromModule('./../json');

function getJSON(url, callback) {
    return {"success":"true"};
}

json.getJSON = getJSON;

module.exports = json;