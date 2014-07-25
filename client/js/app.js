var _app = _app || {};

(function() {
    "use strict";

    _app = angular.module("dropthings", ["ngRoute", "ngSanitize"]);

    _app.config([
        "$routeProvider", function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "templates/home/dashboard.html",
                    controller: "DashboardCtrl"
                })
                .otherwise({ redirectTo: "/" });
        }
    ]);
})();
