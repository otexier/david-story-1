agbeServices.factory('soundService', ['$log',function ($log) {

    var me = {

        soundsById : {},

        agbeService:null,

        registerSound : function(id,sound) {
            me.soundsById[id] = sound;
        },

        unregisterSound : function(id,sound) {
            delete me.soundsById[id];
        },

        playSound : function(soundId) {
            var sound = me.soundsById[soundId];
            if (sound) {
                sound.play();
            }
        },

        innerPlay: function (basePath, nameWithExtension) {
            var isCordova = me.agbeService.isCordova;
            alert('innerPlay : isCordova='+isCordova);
            if (isCordova) {
                /*
                var lla = window.plugins.LowLatencyAudio;
                var idxLastDot = nameWithExtension.lastIndexOf('.');
                var nameWithNoExtension = basePath+nameWithExtension.substr(0, idxLastDot);
                alert('innerPlay : basePath '+basePath+' nameWithExtension: '+nameWithNoExtension+' lla='+lla);
                lla.play(nameWithNoExtension);
                */
                    var url = basePath+'/'+nameWithExtension;
                alert('Avant appel media url = '+url);
                    var my_media = new Media(url,
                        // success callback
                        function () { alert('succes'); },
                        // error callback
                        function (err) { alert('erreur : '+err); }
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