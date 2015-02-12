agbeApp.directive('agbeObject', function () {
    return {
        templateUrl: 'template/agbe-object.html',
        restrict: 'E,A',
        scope: {},
        link: function ($scope, element, $attrs) {
            $scope.objectName = $attrs.name;
            $scope.objectId = $attrs.id;
            $scope.objectNumber = $attrs.number;
            if ($scope.objectNumber == null) {
                $scope.objectNumber = 1;
            }
            // object number declaration
            $scope.agbeService.declareObjectNumber($scope.objectId, $scope.objectNumber);
        },
        controller: ['$scope', '$attrs', 'agbeService', function ($scope, $attrs, agbeService) {

            $scope.agbeService = agbeService;

            $scope.isObjectPresent = function () {
                return agbeService.isObjectPresent($scope.objectId);
            };

            $scope.onObjectClick = function () {
                agbeService.take($scope.objectId);
            }
        }]
    }
});