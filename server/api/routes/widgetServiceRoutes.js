var widgetRepository = require("../repositories/widgetRepository");

module.exports = function(app) {

    "use strict";

    app.get("/api/widgets", widgetRepository.widgets);
};