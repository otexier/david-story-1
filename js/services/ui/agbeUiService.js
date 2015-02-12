agbeServices.factory('agbeUiService', ['$log', 'agbeService', 'dynamicUiService', function (log, agbeService, dynamicUiService) {

    var agbeUiService = {

        AGBE_FIGHT_POPUP_ID: "id_agbe_fight_popup",
        AGBE_STEP_CONTAINER_ID: "id_agbe_step_container",

        currentPopupData: {},

        delay: (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })(),

        redraw: function () {
            agbeUiService.delay(function () {
                dynamicUiService.adjustElements()
            }, 100);
        }

    }

    return agbeUiService;
}]);