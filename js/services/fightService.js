agbeServices.factory('fightService', ['$log', 'dataService', 'agbeService', 'popupService', function ($log, dataService, agbeService, popupService) {

    var me = {

        fightCtrlScope: null,

        retreatAvailable: false,

        characterId: null,

        init: function (characterId) {
            me.characterId = characterId;
            var oc = agbeService.getCharacterOccurrence(characterId);
            if (oc == null) {
                // lazy character declaration if character has not been defined in step
                agbeService.declareCharacterOccurrence(characterId, 1);
            }
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
        },

        endFightRetreat: function () {
            $log.log('fightService.endFightRetreat');
            me.declareRetreat(me.getOpponentCharacterId());
            me.fightCtrlScope.hidePopup();
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

        getCharacterImgPath: function (charId) {
            return agbeService.getCharacterImgPath(charId);
        },

        rollDice6: function () {
            return Math.floor((Math.random() * 6) + 1);
        },

        manageRoundLoss: function () {
            agbeService.mainCharacterChangeHealthPoints(-3);
        },

        manageRoundWin: function () {
            if (me.getOpponent() != null && me.getOpponent().healthPoints) {
                me.getOpponent().healthPoints = me.getOpponent().healthPoints - 3;
                if (me.getOpponentHealthPoints() <= 0) {
                    me.endFightSuccessfully();
                }
            }
        },

        manageRoundEquality: function () {
            popupService.infoOnly("Egalité");
        },

        manageAttackRound: function () {
            var mainAttack = me.rollDice6() + me.getMainCharacterDexterity();
            var opponentAttack = me.rollDice6() + me.getOpponentDexterity();
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