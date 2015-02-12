agbeApp.directive('agbeSound', ['soundService', function (soundService) {
    return {
        template: '',
        scope: {},
        restrict: 'E,A',
        link: function ($scope, element, $attrs) {
            var doLoop = false;
            var id = $attrs.id;
            var doAutoplay = false;
            var volume = 1;


            if ($attrs.autoplay === true || $attrs.autoplay === 'true') {
                doAutoplay = true;
            }
            if ($attrs.volume != null) {
                volume = parseFloat($attrs.volume);
            }

            if ($attrs.loop === true || $attrs.loop == 'true') {
                doLoop = true;
            }
            $scope.howlerElement = new Howl({
                urls: ['./story/' + $attrs.url],
                loop: doLoop,
                autoplay: doAutoplay,
                volume:volume
            });

            if (id) {
                soundService.registerSound(id,$scope.howlerElement);
            }

            $scope.$on('$destroy', function () {
                if (id) {
                    soundService.unregisterSound(id,$scope.howlerElement);
                }
            });

        }
    }
}]);