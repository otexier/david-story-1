agbeApp.directive('agbeTime', function () {
    return {
        template: '<span>{{storyDay()}} - {{storyHours()}}:{{storyMinutes()}}</span>',
        scope: {},
        restrict: 'E,A',
        controller: ['$scope', '$attrs', 'timeService', function ($scope, $attrs, timeService) {

            $scope.storyHours = function () {
                return timeService.getStoryHours();
            };

            $scope.storyMinutes = function () {
                return timeService.getStoryMinutes();
            };


            $scope.storyDay = function () {
                return timeService.getStoryDayAsString();
            };

        }]
    }
});