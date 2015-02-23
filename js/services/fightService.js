agbeServices.factory('fightService', ['$log', 'dataService', 'agbeService', 'popupService','soundService', function ($log, dataService, agbeService, popupService,soundService) {

    var me = {

        fightCtrlScope: null,

        retreatAvailable: false,

        characterId: null,

        // dependencies manually injected
        actionService: null,

        listeners:null,

        fightListenerData:null,

        init: function (characterId) {
            me.characterId = characterId;
            me.fightListenerData= me.initFightListenerData();
            var oc = agbeService.getCharacterOccurrence(characterId);
            if (oc == null) {
                // lazy character declaration if character has not been defined in step
                agbeService.declareCharacterOccurrence(characterId, 1);
            }
        },

        initFightListenerData:function() {
            var result = {};
            result.initialMainCharHealth = me.getMainCharacterHealthPoints();
            result.initialMainCharDexterity = me.getMainCharacterDexterity();
            result.initialOpponentHealth = me.getOpponentHealthPoints();
            result.initialOpponentDexterity = me.getOpponentDexterity();
            result.numberOfRound = 0;
            result.numberOfRoundLoss = 0;
            result.numberOfRoundEquality = 0;
            result.numberOfRoundWin = 0;
            return result;
        },

        clearListeners:function() {
            me.listeners = [];
        },

        addListener:function(fightListener) {
            me.listeners.push(fightListener);
        },

        fight: function (characterId) {
            me.init(characterId);
            me.fightCtrlScope.displayPopup();
        },

        fightOrRetreat: function (characterId) {
            me.retreatAvailable = true;
            me.fight(characterId);
        },

        registerFightCtrlScope: function (fcs) {
            me.fightCtrlScope = fcs;
        },

        getOpponent: function () {
            if (me.characterId != null) {
                return agbeService.getCharacterOccurrence(me.characterId);
            }
            return null;
        },

        getOpponentCharacterId: function () {
            var result = null;
            if (me.getOpponent() != null) {
                result = me.getOpponent().charId;
            }
            return result;
        },

        getOpponentName: function () {
            var result = null;
            if (me.getOpponent() != null) {
                result = me.getOpponent().name;
            }
            return result;
        },

        endFightSuccessfully: function () {
            $log.log('fightService.endFightSuccessFully : opponent ' + me.getOpponentCharacterId() + ' vanquished');
            me.declareVictory(me.getOpponentCharacterId());
            me.fightCtrlScope.hidePopup();
            me.fire('fightSuccess');
            me.actionService.onActionEnd();
        },

        endFightRetreat: function () {
            $log.log('fightService.endFightRetreat');
            me.declareRetreat(me.getOpponentCharacterId());
            me.fightCtrlScope.hidePopup();
            me.fire('fightRetreat');
            me.actionService.onActionEnd();
        },

        declareVictory: function (characterId) {
            var occurrences = agbeService.getCharacterOccurrence(characterId);
            if (occurrences.number > 0) {
                occurrences.numberAlive = occurrences.numberAlive - 1;
            }
        },

        declareRetreat: function (characterId) {
            var retreats = agbeService.getStepRetreats(characterId);
            retreats.number = retreats.number + 1;
        },

        isRetreatAvailable: function () {
            return me.retreatAvailable;
        },


        getMainCharacterHealthPoints: function () {
            return agbeService.getMainChar().healthPoints;
        },


        getMainCharacterName: function () {
            return agbeService.getMainChar().name;
        },

        getMainCharacterDexterity: function () {
            return agbeService.getMainChar().dexterity;
        },

        getOpponentHealthPoints: function () {
            return me.getOpponent().healthPoints;
        },
        getOpponentDexterity: function () {
            return me.getOpponent().dexterity;
        },

        getOpponentAttackSoundPath: function () {
            return agbeService.getCharacterAttackSoundPath(me.getOpponent().charId);
        },

        getCharacterImgPath: function (charId) {
            return agbeService.getCharacterImgPath(charId);
        },

        rollDice6: function () {
            return Math.floor((Math.random() * 6) + 1);
        },

        fire : function(eventType) {
            var fld = me.fightListenerData;
            fld.fightService = me;
            fld.numberOfRound = fld.numberOfRound+1;
            fld.currentMainCharHealth = me.getMainCharacterHealthPoints();
            fld.currentMainCharDexterity = me.getMainCharacterDexterity();
            fld.currentOpponentHealth = me.getOpponentHealthPoints();
            fld.currentOpponentDexterity = me.getOpponentDexterity();
            fld.eventType = eventType;
            switch (eventType) {
                case 'roundEquality' : fld.numberOfRoundEquality = fld.numberOfRoundEquality+1;break;
                case 'roundLoss' : fld.numberOfRoundLoss = fld.numberOfRoundLoss+1;break;
                case 'roundWin' : fld.numberOfRoundWin = fld.numberOfRoundWin+1;break;
                case 'fightSuccess' : break;
                case 'fightRetreat' : break;
                default : alert('fightService.fire : eventType \''+eventType+'\' unknown');break;
            }
            for (var i=0;i<me.listeners.length;i++) {
                var listener = me.listeners[i];
                if (listener != null) {
                    listener(eventType,fld);
                }
            }
        },

        manageRoundLoss: function () {
            agbeService.mainCharacterChangeHealthPoints(-3);
            me.fire('roundLoss');
        },

        manageRoundWin: function () {
            if (me.getOpponent() != null && me.getOpponent().healthPoints) {
                me.getOpponent().healthPoints = me.getOpponent().healthPoints - 3;
                me.fire('roundWin');
                if (me.getOpponentHealthPoints() <= 0) {
                    me.endFightSuccessfully();
                }
            }
        },

        manageRoundEquality: function () {
            popupService.infoOnly("Egalité");
            me.fire('roundEquality');
        },

        manageAttackRound: function () {
            var mainAttack = me.rollDice6() + me.getMainCharacterDexterity();
            var opponentAttack = me.rollDice6() + me.getOpponentDexterity();
            soundService.playStorySound(me.getOpponentAttackSoundPath())
            var attackResult = mainAttack - opponentAttack;
            if (attackResult < 0) {
                me.manageRoundLoss();
            }
            else if (attackResult > 0) {
                me.manageRoundWin();
            }
            else {
                me.manageRoundEquality();
            }
        },

        manageRetreatYes: function () {
            me.endFightRetreat();
        },

        manageRetreat: function () {
            popupService.askYesNo("Voulez-vous vraiment fuir ?", me.manageRetreatYes);
        }

    };
    return me;
}])
;