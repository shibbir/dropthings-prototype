var express        = require("express"),
    http           = require("http"),
    connect        = require("connect"),
    flash          = require("connect-flash"),
    path           = require("path"),
    bodyParser     = require("body-parser"),
    morgan         = require("morgan"),
    methodOverride = require("method-override"),
    cookieParser   = require("cookie-parser"),
    session        = require("express-session");

module.exports = function(passport) {
    var app = express();

    app.use(express.static(__dirname + "../../../client"));
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));
    app.use(methodOverride(function(req) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));
    app.use(cookieParser());
    app.use(session({ secret: "app-secret-key" }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.set("json spaces", 2);
    app.set("port", process.env.PORT || 6060);
    app.set("views", path.join(__dirname, "../views"));

    return app;
};
