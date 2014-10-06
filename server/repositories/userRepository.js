var User = require("../models/userModel");

exports.widgets = function(req, res) {
    "use strict";

    if(req.isAuthenticated()) {
        User.findOne({email: req.user.email}, "widgets", function(err, docs) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(docs);
            }
        });
    } else {
        res.status(401).json({ message: "Unauthorized access is not allowed!" });
    }
};