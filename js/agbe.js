var agbeApp = angular.module('agbe', ['ngRoute','agbe.services']).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/story/:storyStep', {
                templateUrl : 'partials/storyStep.html',
                controller : 'storyStepCtrl'
            }
        );
        $routeProvider.when('/agbe/fight', {
                templateUrl : 'template/agbe-fight.html',
                controller : 'fightCtrl'
            }
        );
        $routeProvider.when('/agbe/:agbePanel', {
                templateUrl : 'partials/agbePanel.html',
                controller : 'agbePanelCtrl'
            }
        );
        $routeProvider.otherwise({
                templateUrl : 'template/home.html',
                controller : 'menuDemarrageCtrl'
            }
        );
    }).
    run(['$log','agbeService','agbeDependenciesManager', function (log,agbeService,agbeDependenciesManager) {
        var startApp = function() {
            log.log("Initialisation du module agbe");
            agbeDependenciesManager.init();
            agbeService.init();
        };
        if (!!window.cordova) {
            document.addEventListener("deviceready", function () {
                startApp();
            }, false);
        }
        else {
            startApp();
        }
    }]);