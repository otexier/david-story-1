agbeServices.factory('agbeDependenciesManager', ['actionService','fightService','agbeService','soundService', function (actionService,fightService,agbeService,soundService) {

    var me = {

        init: function () {
            fightService.actionService = actionService;
            soundService.agbeService = agbeService;
        }
    }

    return me;
}]);