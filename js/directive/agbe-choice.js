agbeApp.directive('agbeChoice', function () {
    return {
        templateUrl: 'template/agbe-choice.html',
        restrict : 'E,A',
        scope: {

        },
        link: function ($scope, element, $attrs) {
            var num = $attrs.label;
            $scope.choiceLabel = num;
            var action = $attrs.action;
            $scope.choiceAction = action;
        },
        controller: ['$scope', '$attrs', 'agbeService','fightService','soundService', function ($scope, $attrs, agbeService,fightService,soundService) {

            $scope.agbeService = agbeService;

            $scope.go = function (destinationPage) {
                agbeService.go(destinationPage);
            }

            $scope.fight = function (opponentId) {
                fightService.fight(opponentId);
            }

            $scope.fightOrRetreat = function (opponentId) {
                fightService.fightOrRetreat(opponentId);
            }

            $scope.take = function (objectId) {
                agbeService.take(objectId);
            }

            $scope.do = function(actionId) {
                agbeService.do(actionId);
            }

            $scope.playSound = function(soundId) {
                soundService.playSound(soundId);
            }

            $scope.onChoiceClick = function () {
                var action = $scope.choiceAction;
                $scope.$eval(action);
            }
        }]
    }
});