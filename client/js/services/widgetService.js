(function(app) {
    "use strict";

    app.factory("widgetService", [
        "apiService", function(apiService) {

            var widgetsUrl = "/api/widgets";

            var getWidgets = function() {
                return apiService.get(widgetsUrl);
            };

            var getRegisteredWidgets = function() {
                return apiService.get("/api/account/widgets");
            };

            var updateWidgets = function(widgets) {
                return apiService.patch(widgetsUrl, { widgets: widgets });
            };

            return {
                getWidgets: getWidgets,
                updateWidgets: updateWidgets,
                getRegisteredWidgets: getRegisteredWidgets
            };
        }
    ]);
})(_app);