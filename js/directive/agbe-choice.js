agbeApp.directive('agbeChoice', function () {
    return {
        templateUrl: 'template/agbe-choice.html',
        restrict: 'E,A',
        scope: {},
        link: function ($scope, element, $attrs) {
            var num = $attrs.label;
            $scope.choiceLabel = num;
            var action = $attrs.action;
            $scope.choiceAction = action;
        },
        controller: ['$scope', '$attrs', 'agbeService', 'fightService', 'soundService','actionService','popupService', function ($scope, $attrs, agbeService, fightService, soundService,actionService,popupService) {

            $scope.onChoiceClick = function () {
                var actionString = $scope.choiceAction;
                actionService.doActions(actionString);
            }

        }]
    }
});