var authorizationMiddleware = require("./middlewares/authorization"),
    userController = require("../controllers/userController");

module.exports = function(app) {
    "use strict";

    app.route("/users/:email/widgets")
        .get(authorizationMiddleware.requiresLoginAsync, userController.widgets)
        .post(authorizationMiddleware.requiresLoginAsync, userController.addWidget);

    app.route("/users/:email/widgets/:widgetId")
        .get(authorizationMiddleware.requiresLoginAsync, userController.resolveWidgetContent)
        .delete(authorizationMiddleware.requiresLoginAsync, userController.deleteWidget);
};