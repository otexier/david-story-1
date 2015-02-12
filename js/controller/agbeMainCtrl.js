agbeApp.controller('agbeMainCtrl', ['$scope', '$log', '$window', 'dynamicUiService',
    function ($scope, $log, $window, dynamicUiService) {

        $log.log("agbeMainCtrl : initialisation");

        var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        // watch on window.resize and onload
        angular.element($window).bind('resize', function () {
            delay(function () {
                dynamicUiService.adjustElements()
            }, 100)
        });
        angular.element($window).bind('onload', function () {
            delay(function () {
                dynamicUiService.adjustElements()
            }, 100)
        });

        // watch on route change success
        $scope.$on('$routeChangeSuccess', function () {
            delay(function () {
                dynamicUiService.adjustElements();
                delay(function () {
                    dynamicUiService.adjustElements()
                }, 1000);
            }, 100);
        })

        $scope.pageRendered = function () {
            $log.log('ageMainCtrl : pageRendered');
            dynamicUiService.adjustElements();
        }


    }
])
;