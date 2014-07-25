(function(app) {
    "use strict";
    app.controller("DashboardCtrl", [
        "$scope", "apiService", "$sce", "widgetService", "widgetHtmlBuilderService", function($scope, apiService, $sce, widgetService, widgetHtmlBuilderService) {
            $scope.widgetCollection = [];
            $scope.data = {
                widgetPanelEnabled: false
            };

            $scope.deliberatelyTrustDangerousSnippet = function(html) {
                return $sce.trustAsHtml(html);
            };

            $scope.init = function() {
                widgetService.getWidgets().success(function(widgets) {
                    _.forEach(widgets, function(widget) {
                        if(widget.widgetType.toLowerCase() === "github") {
                            widgetHtmlBuilderService.buildHtmlForGithubWidget(widget, function(html) {
                                widget.widgetData.html = html;
                                widget.loaded = true;
                            });
                        } else if(widget.widgetType.toLowerCase() === "weather") {
                            widgetHtmlBuilderService.buildHtmlForWeatherWidget(widget, function(html) {
                                widget.widgetData.html = html;
                                widget.loaded = true;
                            });
                        } else if(widget.widgetType.toLowerCase() === "rss") {
                            widgetHtmlBuilderService.buildHtmlForRssWidget(widget, function(html) {
                                widget.widgetData.html = html;
                                widget.loaded = true;
                            });
                        } else {
                            widget.loaded = true;
                        }
                    });

                    $scope.widgets = widgets;
                    $("#widget-container").sortable({
                        placeholder: "ui-state-highlight",
                        cursor: "move",
                        opacity: 0.8,
                        revert: true,
                        scroll: false,
                        start: function(event, ui) {
                            ui.item.startPos = ui.item.index();
                        },
                        stop: function(event, ui) {
                            console.log("Start position: " + ui.item.startPos);
                            console.log("New position: " + ui.item.index());
                        }
                    }).disableSelection();
                });
            }();

            $scope.initWidgetPanel = function() {
                if($scope.data.widgetPanelEnabled) {
                    $scope.data.widgetPanelEnabled = false;
                } else {
                    $scope.data.widgetPanelEnabled = true;
                    if(!$scope.widgetCollection.length) {
                        apiService.get("/api/widgets").success(function(data) {
                            $scope.widgetCollection = data;
                        });
                    }
                }
            };

            $scope.addWidgetToDashboard = function(widget) {
                $scope.data.addingWidgetIsInProgress = true;
                apiService.post("/api/widgets", widget).success(function(newWidget) {
                    if(widget.widgetType.toLowerCase() === "github") {
                        widgetHtmlBuilderService.buildHtmlForGithubWidget(newWidget, function(html) {
                            newWidget.widgetData.html = html;
                            newWidget.loaded = true;
                            $scope.widgets.push(newWidget);
                            $scope.data.addingWidgetIsInProgress = false;
                        });
                    } else if(widget.widgetType.toLowerCase() === "weather") {
                        widgetHtmlBuilderService.buildHtmlForWeatherWidget(newWidget, function(html) {
                            newWidget.widgetData.html = html;
                            newWidget.loaded = true;
                            $scope.widgets.push(newWidget);
                            $scope.data.addingWidgetIsInProgress = false;
                        });
                    } else if(widget.widgetType.toLowerCase() === "rss") {
                        widgetHtmlBuilderService.buildHtmlForRssWidget(newWidget, function(html) {
                            newWidget.widgetData.html = html;
                            newWidget.loaded = true;
                            $scope.widgets.push(newWidget);
                            $scope.data.addingWidgetIsInProgress = false;
                        });
                    } else {
                        newWidget.loaded = true;
                        $scope.widgets.push(newWidget);
                        $scope.data.addingWidgetIsInProgress = false;
                    }
                });
            };

            $scope.discardWidgetFromDashboard = function(index) {
                if(confirm("Are you sure?")) {
                    apiService.remove("/api/widgets/" + $scope.widgets[index].uniqueId).success(function() {
                        $scope.widgets.splice(index, 1);
                    });
                }
            };

            $scope.initEditableWidget = function(widget) {
                $scope.selectedWidgetForModify = widget;
                if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "html") {
                    $scope.initHtmlEditWidget(widget);
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "github") {
                    $scope.initGithubEditWidget(widget);
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "weather") {
                    $scope.initWeatherEditWidget(widget);
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "rss") {
                    $scope.initRssEditWidget(widget);
                }
            };

            $scope.initHtmlEditWidget = function(widget) {
                $scope.modifiedHtmlWidget = angular.copy(widget);
                $("#htmlWidgetEditModal").modal("show");
            };

            $scope.initGithubEditWidget = function(widget) {
                $scope.modifiedGithubWidget = angular.copy(widget);
                $("#githubWidgetEditModal").modal("show");
            };

            $scope.initWeatherEditWidget = function(widget) {
                $scope.modifiedWeatherWidget = angular.copy(widget);
                $("#weatherWidgetEditModal").modal("show");
            };

            $scope.initRssEditWidget = function(widget) {
                $scope.modifiedRssWidget = angular.copy(widget);
                $("#rssWidgetEditModal").modal("show");
            };

            $scope.updateHtmlWidget = function() {
                apiService.patch("/api/widgets/" + $scope.modifiedHtmlWidget.uniqueId, $scope.modifiedHtmlWidget).success(function() {
                    $scope.selectedWidgetForModify.title = $scope.modifiedHtmlWidget.title;
                    $scope.selectedWidgetForModify.widgetData.html = $scope.modifiedHtmlWidget.widgetData.html;
                    $scope.selectedWidgetForModify.loaded = true;
                });
            };

            $scope.updateGithubWidget = function() {
                delete $scope.modifiedGithubWidget.widgetData.html;
                apiService.patch("/api/widgets/" + $scope.modifiedGithubWidget.uniqueId, $scope.modifiedGithubWidget).success(function(data) {
                    widgetHtmlBuilderService.buildHtmlForGithubWidget(data, function(html) {
                        $scope.selectedWidgetForModify.widgetData.html = html;
                        $scope.selectedWidgetForModify.loaded = true;
                    });
                });
            };

            $scope.updateWeatherWidget = function() {
                delete $scope.modifiedWeatherWidget.widgetData.html;
                apiService.patch("/api/widgets/" + $scope.modifiedWeatherWidget.uniqueId, $scope.modifiedWeatherWidget).success(function(data) {
                    widgetHtmlBuilderService.buildHtmlForWeatherWidget(data, function(html) {
                        $scope.selectedWidgetForModify.widgetData.html = html;
                        $scope.selectedWidgetForModify.loaded = true;
                    });
                });
            };

            $scope.updateRssWidget = function() {
                delete $scope.modifiedRssWidget.widgetData.html;
                apiService.patch("/api/widgets/" + $scope.modifiedRssWidget.uniqueId, $scope.modifiedRssWidget).success(function(data) {
                    widgetHtmlBuilderService.buildHtmlForRssWidget(data, function(html) {
                        $scope.selectedWidgetForModify.title = $scope.modifiedRssWidget.title;
                        $scope.selectedWidgetForModify.widgetData.html = html;
                        $scope.selectedWidgetForModify.loaded = true;
                    });
                });
            };

            $scope.updateWidget = function() {
                if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "html") {
                    $scope.updateHtmlWidget();
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "github") {
                    $scope.updateGithubWidget();
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "weather") {
                    $scope.updateWeatherWidget();
                } else if($scope.selectedWidgetForModify.widgetType.toLowerCase() === "rss") {
                    $scope.updateRssWidget();
                }
            };
        }
    ]);
})(_app);