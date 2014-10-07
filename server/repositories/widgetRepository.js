"use strict";

var Widget = require("../models/widgetModel"),
    mongoose = require("mongoose");

exports.apps = function(req, res) {
    Widget.find({}, "-__v", function(err, docs) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.prepareNewWidget = function(widget, callback) {
    var preparedWidget = {
        widgetId: mongoose.Types.ObjectId().toString(),
        title: widget.title,
        widgetType: widget.widgetType,
        widgetData: {}
    };
    if(widget.widgetType.toLowerCase() === "html") {
        preparedWidget.widgetData.html = widget.widgetData.html;
    }
    if(widget.widgetType.toLowerCase() === "github") {
        preparedWidget.widgetData.githubUsername = "shibbir";
        preparedWidget.widgetData.githubRepoUrl = "https://api.github.com/users/shibbir/repos";
    }
    if(widget.widgetType.toLowerCase() === "weather") {
        preparedWidget.widgetData.cityName = "Dhaka";
        preparedWidget.widgetData.weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=dhaka";
    }
    if(widget.widgetType.toLowerCase() === "rss") {
        preparedWidget.widgetData.rssUrl = widget.widgetData.rssUrl;
        preparedWidget.widgetData.pageSize = widget.widgetData.pageSize;
    }

    callback(preparedWidget);
};

exports.prepareExistingWidget = function(widget, reqBody, callback) {
    widget.title = reqBody.title;

    if(widget.widgetType.toLowerCase() === "html") {
        widget.widgetData.html = reqBody.widgetData.html;
    }
    if(widget.widgetType.toLowerCase() === "github") {
        widget.widgetData.githubUsername = reqBody.widgetData.githubUsername;
        widget.widgetData.githubRepoUrl = "https://api.github.com/users/" + reqBody.widgetData.githubUsername + "/repos";
    }
    if(widget.widgetType.toLowerCase() === "weather") {
        widget.widgetData.cityName = reqBody.widgetData.cityName;
        widget.widgetData.weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + reqBody.widgetData.cityName;
    }
    if(widget.widgetType.toLowerCase() === "rss") {
        widget.widgetData.rssUrl = reqBody.widgetData.rssUrl;
        widget.widgetData.pageSize = reqBody.widgetData.pageSize;
    }

    callback(widget);
};