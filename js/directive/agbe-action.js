agbeApp.directive('agbeAction', ['actionService', function (actionService) {
    return {
        templateUrl: '',
        restrict: 'E,A',
        scope: {
            condition:'='
        },
        link: function ($scope, element, $attrs) {
            $scope.action = $attrs.action;
            if ($scope.condition == true || $scope.condition == null) {
                actionService.doActions($scope.action);
            }
        }
    }
}]);