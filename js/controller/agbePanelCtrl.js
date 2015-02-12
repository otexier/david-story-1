agbeApp.controller('agbePanelCtrl', ['$scope', '$location', '$route', '$routeParams', '$log', 'agbeService', '$http','mainCharService',
    function ($scope, $location, $route, $routeParams, $log, agbeService, $http,mainCharService) {

        $log.log("agbePanel : Voici le nom de l'étape : " + $routeParams.agbePanel);

        // externalization
        $scope.agbeService = agbeService;
        //

        $scope.panelRelativePath = function () {
            return 'template/' + $routeParams.agbePanel + '.html';
        };

        $scope.getMainCharName = function() {
            return mainCharService.getMainCharName();
        };

        $scope.getMainCharHealthPoints = function() {
            return mainCharService.getMainCharHealthPoints();
        };

        $scope.onClickWait = function(nbMinutes) {
            agbeService.addMinutes(nbMinutes);
        };

        $scope.onClickReturnToStory = function() {
            agbeService.returnToStory();
        };


    }]);