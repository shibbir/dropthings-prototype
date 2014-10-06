"use strict";

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

exports.requireAnonymous = function(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    next();
};