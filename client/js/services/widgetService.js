(function(app) {
    "use strict";

    app.factory("widgetService", [
        "apiService", function(apiService) {

            var widgetsUrl = "/apps";

            var getWidgets = function() {
                return apiService.get(widgetsUrl);
            };

            var getRegisteredWidgets = function() {
                return apiService.get("/users/shibbir.cse@gmail.com/widgets");
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