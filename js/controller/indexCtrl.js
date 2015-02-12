agbeApp.controller('indexCtrl', ['$scope', '$location','$route', function ($scope, $location,$route) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.agbe_go = function(newLocation) {
        $location.path(newLocation);
    }
}]);