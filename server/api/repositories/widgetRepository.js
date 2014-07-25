"use strict";

var Widget = require("../../models/widgetModel");

exports.widgets = function(req, res) {
    Widget.find({}, "-__v", function(err, docs) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(200, docs);
        }
    });
};