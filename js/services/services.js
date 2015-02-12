var agbeServices = angular.module('agbe.services', []).
    run(['$log', function (log) {
        log.log("Initialisation du module agbe.services");
    }]);