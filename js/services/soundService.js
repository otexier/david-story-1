agbeServices.factory('soundService', ['$log', function ($log) {

    var me = {

        soundsById : {},

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

        preloadSound: function (basePath, soundPathWithExtension) {
            var isPhonegap = (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
            if (isPhonegap) {
                alert('preloadSound : basePath '+basePath+' soundPathWithExtension : '+soundPathWithExtension);
                var idxLastDot = soundPathWithExtension.lastIndexOf('.');
                var nameWithNoExtension = basePath+soundPathWithExtension.substr(0, idxLastDot);
                var lla = window.plugins.LowLatencyAudio;
                alert('preloadSound2 : basePath '+basePath+' soundPathWithExtension : '+soundPathWithExtension+' lla='+lla);
                lla.preloadFX(nameWithNoExtension, basePath + soundPathWithExtension);
            }
        },

        preloadSoundArray: function (basePath, soundArray) {
            for (var i = 0; i < soundArray.length; i++) {
                me.preloadSound(basePath, soundArray[i]);
            }
        },

        innerPlay: function (basePath, nameWithExtension) {
            var isCordova = !!window.cordova;
            alert('innerPlay : isPhonegap='+isPhonegap);
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