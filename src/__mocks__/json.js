const jsonHelper = jest.genMockFromModule('./../jsonHelper');

function getJSON(url, callback) {
    return {"success":"true"};
}

jsonHelper.getJSON = getJSON;

module.exports = jsonHelper;