agbeServices.factory('mainCharService', ['$log', 'agbeService', function (log, agbeService) {

    var me = {

        getMainCharName :function() {
            return agbeService.getMainChar().name;
        },

        getMainCharHealthPoints : function() {
            return agbeService.getMainChar().healthPoints;
        }

    };

    return me;
}]);