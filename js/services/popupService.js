agbeServices.factory('popupService', ['$log', 'dataService', 'agbeService', function ($log, dataService, agbeService) {

    var me = {

        popupCtrlScope: null,

        yesCallback: null,

        noCallback: null,

        workingMode:'',

        registerPopupCtrlScope: function (scope) {
            me.popupCtrlScope = scope;
        },

        clean:function() {
            me.yesCallback = null;
            me.noCallback = null;
            me.message = "Default message";
            me.workingMode = 'question';
        },

        askYesNo: function (message, yesCallback, noCallback) {
            me.clean();
            me.yesCallback = yesCallback;
            me.noCallback = noCallback;
            me.message = message;
            me.popupCtrlScope.displayPopup();
        },

        infoOnly:function(message,okCallback) {
            me.clean();
            me.message = message;
            me.yesCallback = okCallback;
            me.noCallback = null;
            me.popupCtrlScope.displayPopup();
            me.workingMode = 'info';
        },

        isNoAvailable : function() {
           return me.workingMode == 'question';
        }

    };
    agbeService.registerPopupService(me);
    return me;
}])
;