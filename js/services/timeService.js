agbeServices.factory('timeService', ['$log', 'agbeService', function (log, agbeService) {

    var me = {

        getStoryHours: function () {
            var time = agbeService.getTime();
            var result = time.getHours();
            if (result <= 9) {
                result = '0' + result;
            }
            return result;
        },


        getStoryMinutes: function () {
            var time = agbeService.getTime();
            var result = time.getMinutes();
            if (result <= 9) {
                result = '0' + result;
            }
            return result;
        },


        getStoryDayAsString: function () {
            var time = agbeService.getTime();
            var nbDay = time.getDay();
            var result = '';
            switch (nbDay) {
                case 0 :
                    result = 'Dimanche';
                    break;
                case 1 :
                    result = 'Lundi';
                    break;
                case 2 :
                    result = 'Mardi';
                    break;
                case 3 :
                    result = 'Mercredi';
                    break;
                case 4 :
                    result = 'Jeudi';
                    break;
                case 5 :
                    result = 'Vendredi';
                    break;
                case 6 :
                    result = 'Samedi';
                    break;
            }
            return result;
        },

        getStoryDay: function () {
            var time = agbeService.getTime();
            var result = time.getDay();
            return result;
        },

        getNumberOfMinutes : function(hourMinString) {
            var chunks = hourMinString.split(' ');
            if (chunks == null || chunks.length <=1) {
                chunks = hourMinString.split(',');
                if (chunks == null || chunks.length <= 1) {
                    chunks = hourMinString.split(':');
                    if (chunks == null || chunks.length <= 1) {
                        chunks = hourMinString.split(';');
                    }
                }
            }
            if (chunks == null || chunks.length <= 1) {
                alert('Impossible to get hour and minutes from '+hourMinString);
            }
            return parseInt(chunks[0])*60+parseInt(chunks[1]);
        },

        hourMinuteIsInRange: function (minHourMinute, maxHourMinute) {
            var curVal = me.getStoryHours()*60+me.getStoryMinutes();
            var lowerBound = me.getNumberOfMinutes(minHourMinute);
            var upperBound = me.getNumberOfMinutes(maxHourMinute);
            return ((lowerBound <= curVal) && (curVal <= upperBound));
        },

        isDay: function(dayNumber) {
            var curDayNumber = me.getStoryDay();
            return (curDayNumber == dayNumber);
        }

    }
    return me;
}]);
