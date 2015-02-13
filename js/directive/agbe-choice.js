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

            $scope.info = function(infoMessage) {
                popupService.infoOnly(infoMessage,function() {
                    actionService.onActionEnd();
                });
            }

            $scope.take = function (objectId) {
                agbeService.take(objectId);
            }

            $scope.do = function (actionId) {
                agbeService.do(actionId);
            }

            $scope.playSound = function (soundId) {
                soundService.playSound(soundId);
            }

            $scope.onChoiceClick = function () {
                var actionString = $scope.choiceAction;
                actionService.doActions(actionString, $scope);
            }

            $scope.wait = function(nbMinutes) {
                agbeService.addMinutes(nbMinutes);
                actionService.onActionEnd();
            }

            $scope.health = function(delta) {
                agbeService.mainCharacterChangeHealthPoints(delta);
                actionService.onActionEnd();
            }

            $scope.doAction = function (action) {
                $scope.$eval(action);
            }
        }]
    }
});