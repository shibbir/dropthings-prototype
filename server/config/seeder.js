var Widget = require("../models/widgetModel"),
    User = require("../models/userModel");

var widgets = [
    {
        title: "HTML",
        iconClass: "fa-html5",
        widgetType: "html",
        widgetData: {
            html: "This is an HTML widget. You can put any HTML here as you like. You can put pictures, videos, color full text, tables and so on."
        }
    },
    {
        title: "Weather",
        iconClass: "fa-soundcloud",
        widgetType: "weather",
        widgetData: {
            weatherApi: "http://api.openweathermap.org/data/2.5/weather?q=",
            cityName: "Dhaka"
        }
    },
    {
        title: "CNN.com",
        iconClass: "fa-rss",
        widgetType: "rss",
        widgetData: {
            rssUrl: "http://rss.cnn.com/rss/cnn_topstories.rss",
            pageSize: 5
        }
    },
    {
        title: "BBC World",
        iconClass: "fa-rss",
        widgetType: "rss",
        widgetData: {
            rssUrl: "http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/world/rss.xml",
            pageSize: 5
        }
    },
    {
        title: "GitHub",
        iconClass: "fa-github",
        widgetType: "github",
        widgetData: {
            githubUsername: "shibbir"
        }
    }
];

var widgetCollection = [
    {
        widgetId: "53c940bfa48d859e87400a6d",
        widgetType: widgets[0].widgetType,
        title: widgets[0].title,
        widgetData: {
            html: widgets[0].widgetData.html
        },
        position: {
            index: 0
        }
    },
    {
        widgetId: "53c940dba48d859e87400a6e",
        widgetType: widgets[2].widgetType,
        title: widgets[2].title,
        position: {
            index: 1
        },
        widgetData: {
            rssUrl: widgets[2].widgetData.rssUrl,
            pageSize: widgets[2].widgetData.pageSize
        }
    }
];

exports.userSeeder = function() {
    var newUser = new User();
    newUser.name = "Shibbir Ahmed";
    newUser.email = "shibbir.cse@gmail.com";
    newUser.password = newUser.generateHash("HakunaMatata");
    newUser.roles = ["admin"];
    newUser.widgets = widgetCollection;
    newUser.save();
};

exports.widgetSeeder = function() {
    for(var index = 0; index < widgets.length; index++) {
        new Widget(widgets[index]).save();
    }
};