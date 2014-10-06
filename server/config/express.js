var express        = require("express"),
    http           = require("http"),
    connect        = require("connect"),
    flash          = require("connect-flash"),
    path           = require("path"),
    bodyParser     = require("body-parser"),
    morgan         = require("morgan"),
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
    app.use(cookieParser());
    app.use(session({ secret: "app-secret-key" }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.set("json spaces", 2);
    app.set("view engine", "jade");
    app.set("port", process.env.PORT || 7070);
    app.set("views", path.join(__dirname, "../views"));

    if(app.settings.env === "development") {
        app.locals.pretty = true;
    }

    return app;
};