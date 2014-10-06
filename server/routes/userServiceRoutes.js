var userRepository = require("../repositories/userRepository");

module.exports = function(app) {

    "use strict";

    app.route("/api/users/:username/widgets")
        .get(userRepository.widgets);
};