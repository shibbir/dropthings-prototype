(function(app) {
    "use strict";

    app.factory("widgetHtmlBuilderService", ["apiService", function(apiService) {

        var buildHtmlForGithubWidget = function(widget, callback) {
            apiService.get(widget.widgetData.githubRepoUrl).success(function(repos) {
                var html = "<p>List of public repositories by <strong>" + widget.widgetData.githubUsername + "</strong>:</p>";
                html += "<ul>";
                _.forEach(repos, function(repo) {
                    html += "<li><a href='" + repo.html_url + "'>" + repo.html_url + "</a></li><br />";
                });
                html += "</ul>";
                callback(html);
            });
        };

        var buildHtmlForRssWidget = function(widget, callback) {
            apiService.get("/users/shibbir.cse@gmail.com/widgets/" + widget.widgetId).success(function(articles) {
                var html = "<ul>";
                _.forEach(articles, function(article) {
                    html += "<li><a href='" + article.link + "'>" + article.title + "</a></li><br />";
                });
                html += "</ul>";
                callback(html);
            }).error(function() {
                var html = "<p>Oops. Server Error.</p>";
                callback(html);
            });
        };

        var buildHtmlForWeatherWidget = function(widget, callback) {
            apiService.get("/users/shibbir.cse@gmail.com/widgets/" + widget.widgetId).success(function(weatherData) {
                var html = "<p>Weather Report for <strong>" + widget.widgetData.cityName + "</strong>:</p>";
                if(weatherData.cod === "404") {
                    html += weatherData.message;
                } else {
                    html += "<div>";
                    html += "Condition: " + weatherData.weather[0].description;
                    html += "<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>";
                    html += "</div>";

                    html += "<div>";
                    html += "Humidity: " + weatherData.main.humidity + "%";
                    html += "</div>";

                    html += "<div>";
                    html += "Pressure:" + weatherData.main.pressure + " hpa";
                    html += "</div>";
                }
                callback(html);
            });
        };

        return {
            buildHtmlForGithubWidget: buildHtmlForGithubWidget,
            buildHtmlForRssWidget: buildHtmlForRssWidget,
            buildHtmlForWeatherWidget: buildHtmlForWeatherWidget
        };
    }]);
})(_app);