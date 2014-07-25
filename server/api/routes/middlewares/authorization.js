"use strict";

var httpStatusCode = {
    unAuthorized: function(message) {
        return {
            error: {
                message: message || "User is not authenticated",
                statusCode: 401
            }
        }
    }
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, httpStatusCode.unAuthorized());
    }
    next();
};

exports.requiresAdmin = function(req, res, next) {
    if (!req.isAuthenticated() || !req.user.isAdmin()) {
        return res.send(401, httpStatusCode.unAuthorized());
    }
    next();
};
