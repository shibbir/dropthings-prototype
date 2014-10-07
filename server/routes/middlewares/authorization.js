"use strict";

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

exports.requiresLoginAsync = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized access is not allowed!" });
    }
    next();
};

exports.requireAnonymous = function(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    next();
};