agbeApp.directive('header', function () {
    return {
        templateUrl: 'template/header.html',
        restrict: 'E,A',
        controller: ['$scope','agbeService', function ($scope,agbeService) {

            $scope.getMainCharHealthPoints = function () {
                return agbeService.getMainChar().healthPoints;
            }

        }]
    }
})
;