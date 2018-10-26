var jsonHelper = {
    getJSON:(url, callback) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
        request.onload = function () {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                callback(data.items);
            }
        };
        request.send();
    },
}

module.exports = jsonHelper;