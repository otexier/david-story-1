agbeApp.directive('agbePopup', ['$window','agbeUiService', function (window,agbeUiService) {
    return function (scope, element) {
        var jqWindow = $(window);
        element.addClass("agbe_fight_popup");
        agbeUiService.currentPopupData = {h:0,w:0};
        scope.getWindowDimensions = function () {
            return { 'h': jqWindow.height(), 'w': jqWindow.width() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            element.height(newValue.h / 1.3);
            element.width(newValue.w / 2 );
            element.css("top", Math.max(0, ((jqWindow.height() - element.outerHeight()) / 2) +
                jqWindow.scrollTop()) + "px");
            element.css("left", Math.max(0, ((jqWindow.width() - element.outerWidth()) / 2) +
                jqWindow.scrollLeft()) + "px");
            agbeUiService.currentPopupData.h = element.height();
            agbeUiService.currentPopupData.w = element.width();
        }, true);

        jqWindow.bind('resize', function () {
            scope.$apply();
        });
    }
}]);