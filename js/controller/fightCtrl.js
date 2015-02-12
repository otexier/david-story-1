agbeApp.controller('fightCtrl', ['$scope', '$location', '$route', '$routeParams', '$log', 'fightService','agbeUiService',
    function ($scope, $location, $route, $routeParams, $log, fightService,agbeUiService) {


        fightService.registerFightCtrlScope($scope);

        $scope.fightPopupVisible = false;

        $scope.displayPopup = function () {
            $scope.fightPopupVisible = true;
            agbeUiService.redraw();
        }

        $scope.hidePopup = function() {
            $scope.fightPopupVisible = false;
        }

        $scope.isRetreatAvailable = function() {
            return fightService.isRetreatAvailable();
        }

        $scope.getMainCharacterImgWidth = function () {
            var currentPopupWidth = agbeUiService.currentPopupData.w;
            return currentPopupWidth / 3;
        }

        $scope.getMainCharacterImgPath = function () {
            return './story/img/characters/main.jpg';
        }

        $scope.getOpponentImgWidth = function () {
            var currentPopupWidth = agbeUiService.currentPopupData.w;
            return currentPopupWidth / 3;
        }

        $scope.getOpponentName = function() {
            if ($scope.fightPopupVisible) {
                return fightService.getOpponentName();
            }
        }

        $scope.getOpponentImgPath = function () {
            if ($scope.fightPopupVisible) {
                var charId = fightService.getOpponentCharacterId();
                return './story/img/' + fightService.getCharacterImgPath(charId);
            }
        }

        $scope.getMainCharacterHealthPoints = function () {
            return fightService.getMainCharacterHealthPoints();
        }

        $scope.getMainCharacterName = function () {
            return fightService.getMainCharacterName();
        }

        $scope.getOpponentHealthPoints = function () {
            if ($scope.fightPopupVisible) {
                return fightService.getOpponentHealthPoints();
            }
        }

        $scope.onClickAttack = function () {
            fightService.manageAttackRound();
        }

        $scope.onClickRetreat = function () {
            fightService.manageRetreat();
        }

    }]);