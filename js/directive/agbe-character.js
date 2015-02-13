agbeApp.directive('agbeCharacter', function () {
    return {
        templateUrl: 'template/agbe-character.html',
        scope: {},
        restrict: 'E,A',
        link: function ($scope, element, $attrs) {
            $scope.characterId = $attrs.id;
            $scope.characterName = $attrs.name;
            $scope.characterNumber = $attrs.number;
            var fightOnClickString = $attrs.clickable;
            if (fightOnClickString == "false") {
                $scope.fightOnClick = false;
            }
            else {
                $scope.fightOnClick = true;
            }
            if ($scope.characterNumber == null) {
                $scope.characterNumber = 1;
            }
            $scope.displayCharacter = (typeof $attrs.hidden === 'undefined');
            $scope.options = null;
            if ($attrs.options) {
                var optionsObject = JSON.parse($attrs.options);
                if (optionsObject) {
                    $scope.options = optionsObject;
                }
            }
            $scope.agbeService.declareCharacterOccurrence($scope.characterId, $scope.characterNumber, $scope.options);
            if ($scope.characterName) {
                $scope.agbeService.getCharacterOccurrence($scope.characterId).name = $scope.characterName;
            }
        },
        controller: ['$scope', '$attrs', 'agbeService', 'fightService', 'popupService', function ($scope, $attrs, agbeService, fightService, popupService) {

            $scope.agbeService = agbeService;

            $scope.characterHasToBeDisplayed = function () {
                return $scope.displayCharacter && agbeService.isCharacterOccurrencePresent($scope.characterId);
            };

            $scope.characterIsAlive = function () {
                return agbeService.isCharacterOccurrenceAlive($scope.characterId, 1)
            }

            $scope.characterIsDead = function () {
                return agbeService.isCharacterOccurrenceDead($scope.characterId, 1)
            }

            $scope.getCharacterName = function () {
                if ($scope.characterId != null) {
                    return agbeService.getCharacterName($scope.characterId);
                }
            };

            $scope.getCharacterImgPath = function () {
                if ($scope.characterId != null) {
                    return agbeService.getCharacterImgPath($scope.characterId);
                }
            };

            $scope.onAliveCharacterClick = function () {
                if ($scope.fightOnClick) {
                    fightService.fightOrRetreat($scope.characterId);
                }
            };

            $scope.onDeadCharacterClick = function () {
                popupService.infoOnly("Merci de laisser ce mort tranquille");
            };
        }]
    }
});