agbeServices.factory('actionService', ['$log', 'agbeService', function ($log, agbeService) {

    var me = {

        multipleActionsContext: null,

        currentActionIndex: 0,

        actionsArray: null,

        scopeForActions: null,

        doActions: function (actionsString, scopeForActions) {
            me.currentActionIndex = 0;
            me.scopeForActions = scopeForActions;
            me.actionsArray = actionsString.split(';');
            me.multipleActionsContext = new agbeEntities.MultipleActionsContext();
            me.doCurrentAction();
        },

        doCurrentAction: function () {
            var action = me.actionsArray[me.currentActionIndex];
            if (action != null && action.length > 0) {
                me.scopeForActions.doAction(action);
            }
        },

        onActionEnd: function () {
            me.currentActionIndex = me.currentActionIndex + 1;
            me.doCurrentAction();
        }


    };
    return me;
}])
;