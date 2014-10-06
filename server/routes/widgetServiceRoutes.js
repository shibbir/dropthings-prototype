var widgetRepository = require("../repositories/widgetRepository"),
    userRepository = require("../repositories/userRepository");

module.exports = function(app) {

    "use strict";

    app.route("/api/widgets")
        .get(widgetRepository.widgets);

    app.route("/api/account/widgets")
        .get(userRepository.widgets);
};