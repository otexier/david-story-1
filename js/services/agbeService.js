agbeServices.factory('agbeService', ['$location', '$log', 'dataService', 'agbeAdapter','soundService', function ($location, log, dataService, agbeAdapter,soundService) {

    var agbeService = {

        popupService:null,

        // public API methods

        agbeGo: function (agbeLocation) {
            $location.path('/agbe/' + agbeLocation);
        },

        init: function () {
            log.log("agbeService.init()");
            dataService.worldData = agbeAdapter.createStartWorld();
            agbeService.forAllCharacters(function (character) {
                soundService.preloadSound('story/',character.attackSoundPath);
            })
        },

        forAllCharacters:function(callback) {
            if (typeof callback == 'function') {
                for (var id in dataService.worldData.characterDictionnary) {
                    var character = dataService.worldData.characterDictionnary[id];
                    callback(character);
                }
            }
            else {
                alert("given parameter "+callback+" is not a function");
            }
        },

        go: function (newLocation,amountMinutes) {
            if (amountMinutes == null) {
                amountMinutes = 10;
            }
            agbeService.addMinutes(amountMinutes);
            dataService.storyData.step = newLocation;
            $location.path('/story/' + newLocation);
        },

        returnToStory : function() {
            var storyStep = agbeService.getStep();
            log.log('agbeService.returnToStory : '+storyStep);
            $location.path('/story/'+storyStep);
        },

        getStep : function() {
            return dataService.storyData.step;
        },

        loadStory: function () {
            log.log("agbeService.loadStory()");
            dataService.load();
            agbeService.go(dataService.storyData.step,0);
        },

        newStory: function () {
            log.log("agbeService.newStory()");
            dataService.characterData = agbeAdapter.createStartCharacter();
            dataService.inventoryData = agbeAdapter.createStartInventory();
            dataService.storyData = agbeAdapter.createStartStory();
            agbeService.go(dataService.storyData.step);
        },

        getMainChar:function() {
            return dataService.characterData;
        },

        getTime:function() {
            return dataService.storyData.date;
        },

        setTime:function(newTime) {
           dataService.storyData.date = newTime;
        },

        mainCharacterChangeHealthPoints: function (healthPointsDelta) {
            var mainChar = agbeService.getMainChar();
            mainChar.healthPoints = mainChar.healthPoints+healthPointsDelta;
            log.log('agbeService.mainCharacterChangeHealthPoints : delta de '+healthPointsDelta+'. Résultat : '+mainChar.healthPoints);
            if (mainChar.healthPoints <=0) {
                agbeService.manageMainCharDeath();
            }
        },

        manageMainCharDeath : function() {
            agbeService.popupService.infoOnly(
                "Vous êtes mort. Votre aventure est terminée.",function() {
                    $location.path('/home');
                }
            )
        },

        registerPopupService : function(popupService) {
            agbeService.popupService = popupService;
        },

        registerCharacter: function (world, character) {
            world.characterDictionnary[character.id] = character;
        },

        registerObject: function (world, object) {
            world.objectDictionnary[object.id] = object;
        },

        saveStory: function () {
            log.log("agbeService.saveStory()");
            dataService.save();
            agbeService.go(dataService.storyData.step,0);
        },

        do : function(actionId) {
            if (!actionId) {
                alert('agbeService.do : actionId is null');
            }
            var storyData = agbeService.getDataByStep();
            storyData[actionId] = true;
        },

        isDone : function(actionId) {
            if (!actionId) {
                alert('agbeService.isDone : actionId is null');
            }
            var storyData = agbeService.getDataByStep();
            var result = storyData[actionId];
            if (result === true) {
                return true;
            }
            else {
                return false;
            }
        },

        take: function (objectId) {
            var objectInfo = agbeService.getObjectInfo(objectId);

            if (objectInfo.number >= 1) {
                objectInfo.number = objectInfo.number - 1;
            }
            else {
                alert('Impossible to take object with id ' + objectId + ' : current number is ' + objectInfo.number);
            }
            var inventoryObjectInfo = agbeService.getInventoryObjectInfo(objectId);
            if (typeof inventoryObjectInfo.number === "undefined") {
                inventoryObjectInfo.number = 0;
            }
            inventoryObjectInfo.number = inventoryObjectInfo.number + 1;
        },

        // private API methods

        addMinutes:function(amountMinutes) {
            var currentTime = agbeService.getTime();
            var newTime = new Date(currentTime.getTime()+amountMinutes*60000);
            agbeService.setTime(newTime);
        },

        declareObjectNumber: function (objectId, objectNb) {
            var objectInfo = agbeService.getObjectInfo(objectId);
            if (objectInfo != null) {
                if (typeof objectInfo.number === "undefined") {
                    objectInfo.number = objectNb;
                }
            }
        },

        dropObject: function (objectId) {
            var inventoryObjectInfo = agbeService.getInventoryObjectInfo(objectId);
            inventoryObjectInfo.number = inventoryObjectInfo.number - 1;
            if (inventoryObjectInfo.number <= 0) {
                delete dataService.inventoryData.objects[objectId];
            }
        },

        getStepRetreats: function (characterId) {
            var result = null;
            var dataByStep = agbeService.getDataByStep();
            result = dataByStep.retreats;
            if (result == null) {
                result = {number: 0};
                dataByStep.retreats = result;
            }
            return result;
        },

        getDataByStep: function () {
            var dataByStep = dataService.storyData.dataByStep[dataService.storyData.step];
            if (dataByStep == null) {
                dataByStep = {};
                dataService.storyData.dataByStep[dataService.storyData.step] = dataByStep;
            }
            return dataByStep;
        },

        array: function (thing) {
            if (angular.isArray(thing)) {
                return thing;
            }
            else {
                var res = [];
                res.push(thing);
                return res;
            }
        },

        isCharacterOccurrenceAlive: function (charId, numberAlive) {
            var result = false;
            if (numberAlive == null) {
                numberAlive = 1;
            }
            if (charId == null) {
                alert("agbeService.isCharacterOccurrenceAlive : charIs is null");
            }
            var occurrence = agbeService.getCharacterOccurrence(charId);
            if (occurrence != null && occurrence.numberAlive >= numberAlive) {
                result = true;
            }
            return result;
        },

        isCharacterOccurrenceDead: function (charId, numberDead) {
            var result = false;
            if (numberDead == null) {
                numberDead = 1;
            }
            if (charId == null) {
                alert("agbeService.isCharacterOccurrenceDead : charIs is null");
            }
            var occurrence = agbeService.getCharacterOccurrence(charId);
            if (occurrence != null && occurrence.number != null && (occurrence.number - occurrence.numberAlive) >= numberDead) {
                result = true;
            }
            return result;
        },



        isStepRetreatFor: function (charIds) {
            var result = false;
            if (charIds != null) {
                var charIds = agbeService.array(charIds);
                var numberByCharId = {};
                for (var i = 0; i < charIds.length; i++) {
                    var cid = charIds[i];
                    if (numberByCharId[cid] == null) {
                        numberByCharId[cid] = 1;
                    }
                    else {
                        numberByCharId[cid] = numberByCharId[cid] + 1;
                    }
                }
                var memberNumber = Object.keys(numberByCharId).length;
                var okMemberNumber = 0;
                for (var cid in numberByCharId) {
                    var retreats = agbeService.getStepRetreats(cid);
                    if (retreats == null || retreats.number < numberByCharId[cid]) {
                        break;
                    }
                    okMemberNumber = okMemberNumber + 1;
                }
                if (okMemberNumber == memberNumber) {
                    result = true;
                }
            }
            return result;
        },

        getInventoryObjectInfo: function (objectId) {
            var obj = dataService.worldData.objectDictionnary[objectId];
            if (obj == null) {
                alert('getInventoryObjectInfo : Impossible to retrieve object with id ' + objectId);
            }
            var res = dataService.inventoryData.objects[objectId];
            if (res == null) {
                res = new agbeEntities.ObjectInfo(objectId);
                dataService.inventoryData.objects[objectId] = res;
            }
            return res;
        },

        getInventoryObjectKeyList: function () {
            var result = [];
            for (var objectId in dataService.inventoryData.objects) {
                result.push(objectId);
            }
            return result;
        },


        getCharacterOccurrence: function (charId) {
            var char = dataService.worldData.characterDictionnary[charId];
            if (char == null) {
                alert('getCharacterOccurrence : Impossible to retrieve character with id ' + charId);
            }
            var dataByStep = agbeService.getDataByStep();
            if (dataByStep.characterOccurences == null) {
                dataByStep.characterOccurences = {};
            }
            var res = dataByStep.characterOccurences[charId];
            if (res == null) {
                res = new agbeEntities.CharacterOccurrence(charId);
                res.dexterity = char.dexterity;
                res.healthPoints = char.healthPoints;
                res.name = char.name;
                dataByStep.characterOccurences[charId] = res;
            }
            return res;
        },

        declareCharacterOccurrence: function (charId, charNumber,options) {
            var oc = agbeService.getCharacterOccurrence(charId, charNumber);
            if (!oc.setByStory) {
                oc.number = charNumber;
                oc.numberAlive = charNumber;
                if (options) {
                    if (options.name) {
                        oc.name = options.name;
                    }
                }
                oc.setByStory = true;
            }
        },

        getObjectInfo: function (objectId) {
            var obj = dataService.worldData.objectDictionnary[objectId];
            if (obj == null) {
                alert('getObjectInfo : Impossible to retrieve object with id ' + objectId);
            }
            var dataByStep = agbeService.getDataByStep();
            if (dataByStep.objectsInfos == null) {
                dataByStep.objectsInfos = {};
            }
            var res = dataByStep.objectsInfos[objectId];
            if (res == null) {
                res = new agbeEntities.ObjectInfo();
                dataByStep.objectsInfos[objectId] = res;
            }
            return res;
        },

        getCharacterAttackSoundPath: function (characterId) {
            var result = null;
            var char = dataService.worldData.characterDictionnary[characterId];
            if (char == null) {
                alert("Impossible to find character with id=" + characterId);
            }
            result = char.attackSoundPath;
            return result;
        },

        getCharacterImgPath: function (characterId) {
            var result = null;
            var char = dataService.worldData.characterDictionnary[characterId];
            if (char == null) {
                alert("Impossible to find character with id=" + characterId);
            }
            result = char.img;
            return result;
        },

        getPhysicalObject: function (objectId) {
            var obj = dataService.worldData.objectDictionnary[objectId];
            if (obj == null) {
                alert('getPhysicalObject : Impossible to retrieve object with id ' + objectId);
            }
            return obj;
        },

        isCharacterOccurrencePresent: function (characterId) {
            var isPresent = false;
            var characterOccurrence = agbeService.getCharacterOccurrence(characterId);
            isPresent = characterOccurrence.number >= 1;
            return isPresent;
        },

        isObjectPresent: function (objectId) {
            var isPresent = false;
            var objectInfo = agbeService.getObjectInfo(objectId);
            isPresent = objectInfo.number >= 1;
            return isPresent;
        }
    }

    // direct injection to circumvent circular dependencies error
    agbeAdapter.agbeService = agbeService;

    return agbeService;
}]);