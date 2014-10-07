var widgetRepository = require("../repositories/widgetRepository"),
    authorizationMiddleware = require("./middlewares/authorization");

module.exports = function(app) {

    "use strict";

    app.route("/apps")
        .get(authorizationMiddleware.requiresLoginAsync, widgetRepository.apps);
};