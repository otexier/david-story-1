agbeServices.factory('soundService', ['$log', function ($log) {

    var me = {

        soundsById: {},

        registerSound: function (id, sound) {
            me.soundsById[id] = sound;
        },

        unregisterSound: function (id, sound) {
            delete me.soundsById[id];
        },

        playSound: function (soundId) {
            var sound = me.soundsById[soundId];
            if (sound) {
                sound.play();
            }
        },

        getSoundPathPlatformPrefix: function () {
            var result = '';
            var pf = window.device.platform;
            switch (pf.toUpperCase()) {
                case 'ANDROID' :
                    result = '/android_asset/www/';
                    break;
                default : alert('soundService : platform '+pf+' not managed !');
            }
            return result;
        },

        innerPlay: function (basePath, nameWithExtension) {
            var isCordova = !!window.cordova;
            if (isCordova) {
                var prefix = me.getSoundPathPlatformPrefix();
                var url = prefix + basePath + nameWithExtension;
                var my_media = new Media(url,
                    // success callback
                    function () {
                        alert('succes');
                    },
                    // error callback
                    function (err) {
                        alert('erreur : ' + err.message + ' ' + err.code);
                    }
                );
                // Play audio
                my_media.play();
            }
            else {
                var auOgg = new Audio(basePath + nameWithExtension);
                auOgg.load();
                auOgg.play();
            }
        },

        playAgbeSound: function (nameWithExtension) {
            me.innerPlay('audio/', nameWithExtension);
        },

        playStorySound: function (nameWithExtension) {
            me.innerPlay('story/', nameWithExtension);
        }
    }

    return me;
}]);