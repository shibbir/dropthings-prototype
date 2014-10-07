var User = require("../models/userModel"),
    widgetManager = require("./widgetRepository");

exports.widgets = function(email, callback) {
    "use strict";

    User.findOne({ email: email }, "widgets", function(err, docs) {
        if (err) {
            callback(null, err);
        } else {
            callback(docs.widgets);
        }
    });
};

exports.widget = function(email, widgetId, callback) {
    User.findOne({ email: email, "widgets.widgetId": widgetId }, { "widgets.$": 1 }, function (err, doc) {
        if (err) {
            callback(null, err);
        }
        callback(doc.widgets[0]);
    });
};

exports.addNewWidget = function(email, widget, callback) {
    widgetManager.prepareNewWidget(widget, function(preparedWidget) {
        User.update(
            { email: email },
            { $push: { widgets: preparedWidget } },
            function (err) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(preparedWidget);
                }
            }
        );
    });
};

exports.deleteWidget = function(email, widgetId, callback) {
    User.findOne({ email: email, "widgets.widgetId": widgetId }, { "widgets.$": 1 }).exec(function(err, doc) {
        if (err) {
            callback(err);
        } else {
            if(doc.widgets[0]) {
                User.update(
                    { email: email },
                    { $pull: { widgets: doc.widgets[0] } },
                    function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    }
                );
            } else {
                callback();
            }
        }
    });
};