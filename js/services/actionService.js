agbeServices.factory('actionService', ['$log', 'agbeService', 'popupService','$rootScope','fightService', function ($log, agbeService, popupService,$rootScope,fightService) {

    var me = {

        multipleActionsContext: null,

        currentActionIndex: 0,

        actionsArray: null,

        privateScope:null,

        doActions: function (actionsString) {
            me.currentActionIndex = 0;
            fightService.clearListeners();
            me.privateScope = me.buildPrivateScope();
            me.actionsArray = actionsString.split(';');
            me.multipleActionsContext = new agbeEntities.MultipleActionsContext();
            me.doCurrentAction();
        },

        doCurrentAction: function () {
            var action = me.actionsArray[me.currentActionIndex];
            if (action != null && action.length > 0) {
                me.doAction(action);
            }
        },

        doAction : function(actionAsString) {
            me.privateScope.doAction(actionAsString);
        },

        onActionEnd: function () {
            me.currentActionIndex = me.currentActionIndex + 1;
            me.doCurrentAction();
        },

        buildPrivateScope : function() {
            var result = $rootScope.$new(true);
            result.go = function (destinationPage) {
                agbeService.go(destinationPage);
            }

            result.fight = function (opponentId) {
                fightService.fight(opponentId);
            }

            result.fightOrRetreat = function (opponentId) {
                fightService.fightOrRetreat(opponentId);
            }

            result.info = function(infoMessage) {
                popupService.infoOnly(infoMessage,function() {
                    me.onActionEnd();
                });
            }

            result.take = function (objectId) {
                agbeService.take(objectId);
            }

            result.do = function (actionId) {
                agbeService.do(actionId);
            }

            result.playSound = function (soundId) {
                soundService.playSound(soundId);
            }

            result.wait = function(nbMinutes) {
                agbeService.addMinutes(nbMinutes);
                me.onActionEnd();
            }

            result.health = function(delta) {
                agbeService.mainCharacterChangeHealthPoints(delta);
                me.onActionEnd();
            }

            result.doAction = function (action) {
                result.$eval(action);
            }

            result.resetHealthPoints = function() {
                agbeService.mainCharacterResetHealthPoints()
            }

            result.isLastFightWon = function() {
                return false;
            }

            result.registerFightListener = function(listenerName) {
                var listener = agbeApp.storyScripts[listenerName];
                var decoratedListener = function(eventType,data) {
                    if (data) {
                        data.actionService = me;
                    }
                    listener(eventType,data);
                }
                fightService.addListener(decoratedListener);
                me.onActionEnd();
            }

            return result;
        }


    };
    return me;
}])
;