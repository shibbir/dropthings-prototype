exports.resolveRssFeed = function(rssUrl, pageSize, callback) {
    var feed = require("feed-read");

    feed(rssUrl, function(err, articles) {
        if (err) {
            callback(null, err);
        } else {
            if(articles.length > pageSize) {
                articles = articles.splice(0, pageSize);
            }
            callback(articles);
        }
    });
};

exports.resolveWeather = function(url, callback) {
    var http = require("http");

    http.get(url, function (response) {
        var buffer = "";

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function () {
            callback(JSON.parse(buffer));
        });
    });
};