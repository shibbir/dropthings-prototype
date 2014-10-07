var userRepository = require("../repositories/userRepository"),
    widgetContentResolver = require("../core/widgetContentResolver");

exports.widgets = function(req, res) {
    userRepository.widgets(req.user.email, function(docs, err) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(docs);
    });
};

exports.addWidget = function(req, res) {
    userRepository.addNewWidget(req.params.email, req.body, function(doc, err) {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(doc);
    });
};

exports.deleteWidget = function(req, res) {
    userRepository.deleteWidget(req.params.email, req.params.widgetId, function(err) {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(null);
    });
};

exports.resolveWidgetContent = function(req, res) {
    userRepository.widget(req.params.email, req.params.widgetId, function(doc, err) {
        if(err) {
            res.status(500).json(err);
        }
        if (doc.widgetType.toLowerCase() === "rss") {
            widgetContentResolver.resolveRssFeed(doc.widgetData.rssUrl, doc.widgetData.pageSize, function (articles, err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(articles);
                }
            });
        } else if (doc.widgetType.toLowerCase() === "weather") {
            widgetContentResolver.resolveWeather(doc.widgetData.weatherApi, function (data) {
                res.status(200).json(data);
            });
        }
    });
};