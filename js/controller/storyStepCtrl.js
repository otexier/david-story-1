agbeApp.controller('storyStepCtrl', ['$scope', '$location', '$route', '$routeParams', '$log', 'agbeService','storyStepService','soundService',
    function ($scope, $location, $route, $routeParams, $log, agbeService,storyStepService,soundService) {

        // externalization of variables
        $scope.agbeService = agbeService;

        $log.log("Voici le nom de l'étape : " + $routeParams.storyStep);

        $scope.stepRelativePath = function () {
            return 'story/' + $routeParams.storyStep + '.html';
        }

        $scope.onCharacterClick = function () {
            agbeService.agbeGo('character');
        }

        $scope.onInventoryClick = function () {
            agbeService.agbeGo('inventory');
        }

        $scope.onParametersClick = function () {
            agbeService.agbeGo('parameters');
        }

        $scope.onTimeClick = function () {
            agbeService.agbeGo('time');
        }

        $scope.isAlive = function(charIds) {
            return storyStepService.isAlive(charIds);
        }

        $scope.isObjectPresent = function(objectId) {
            return storyStepService.isObjectPresent(objectId);
        }

        $scope.isDead= function(charIds) {
            return storyStepService.isDead(charIds);
        }

        $scope.isDone = function(actionId) {
            return storyStepService.isDone(actionId);
        }

        $scope.hasRetreated = function(charIds) {
            return storyStepService.hasRetreated(charIds);
        }

        $scope.hourMinuteIsInRange = function(minHourMinute,maxHourMinute) {
            return storyStepService.hourMinuteIsInRange(minHourMinute,maxHourMinute);
        }

        $scope.isDay = function(dayNumber) {
            return storyStepService.isDay(dayNumber);
        }

        $scope.playSound = function(soundId) {
            soundService.play(soundId);
        }
    }]);