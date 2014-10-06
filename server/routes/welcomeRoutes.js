var authorizationMiddleware = require("./middlewares/authorization");

module.exports = function(app, passport) {

    "use strict";

    app.route("/").get(function(req, res) {
        res.redirect("/dashboard");
    });

    app.route("/login").
        get(authorizationMiddleware.requireAnonymous, function(req, res) {
            res.render("account/login", { error: req.flash("error") });
        })
        .post(authorizationMiddleware.requireAnonymous, passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: "Invalid username or password."
        }));

    app.route("/dashboard").get(authorizationMiddleware.requiresLogin, function(req, res) {
        res.render("account/dashboard");
    });
};