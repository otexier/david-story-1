agbeServices.factory('agbeDependenciesManager', ['actionService','fightService', function (actionService,fightService) {

    var me = {

        init: function () {
            fightService.actionService = actionService;
        }
    }

    return me;
}]);