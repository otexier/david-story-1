agbeApp.controller('popupCtrl', ['$scope', '$location', '$route', '$routeParams', '$log', 'popupService','agbeUiService',
    function ($scope, $location, $route, $routeParams, $log, popupService,agbeUiService) {


        popupService.registerPopupCtrlScope($scope);

        $scope.yesLabel = "OK";
        $scope.noLabel = "Annuler";
        $scope.popupVisible = false;

        $scope.message = "Message";

        $scope.displayPopup = function () {
            $scope.popupVisible = true;
            agbeUiService.redraw();
        }

        $scope.hidePopup = function () {
            $scope.popupVisible = false;
        }

        $scope.onClickYes = function () {
            $scope.hidePopup();
            if (popupService.yesCallback != null) {
                popupService.yesCallback();
            }
        }

        $scope.onClickNo = function () {
            $scope.hidePopup();
            if (popupService.noCallback != null) {
                popupService.noCallback();
            }
        }

        $scope.isNoAvailable = function() {
            return popupService.isNoAvailable();
        }

        $scope.getMessage = function() {
            return popupService.message;
        }


    }]);