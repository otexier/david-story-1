agbeServices.factory('storyStepService', ['$location', '$log', 'dataService', 'agbeService','timeService', function ($location, log, dataService, agbeService,timeService) {

    var me = {

        isAlive: function (params) {
            var result = false;
            result = agbeService.isCharacterOccurrenceAlive(params, 1);
            return result;
        },

        isDead: function (params) {
            var result = false;
            result = agbeService.isCharacterOccurrenceDead(params, 1);
            return result;
        },

        isDone:function (actionId) {
            return agbeService.isDone(actionId);
        },

        hasRetreated: function (params) {
            var result = false;
            result = agbeService.isStepRetreatFor(params);
            return result;
        },

        hourMinuteIsInRange: function(minHourMinute,maxHourMinute) {
            return timeService.hourMinuteIsInRange(minHourMinute,maxHourMinute);
        },

        isDay : function(dayNumber) {
           return timeService.isDay(dayNumber);
        }



    };

    return me;
}]);