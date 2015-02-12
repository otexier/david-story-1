agbeApp.controller('menuDemarrageCtrl', ['$scope', '$location','$route','$log','agbeService', function ($scope, $location,$route,$log,agbeService) {
    $log.log("Initialisation de menuDemarrageCtrl");
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.agbeService = agbeService;
}]);