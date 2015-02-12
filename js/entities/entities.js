var agbeEntities = {

    /**
     * @name Character
     */
    Character: function (id, name, healthPoints, dexterity, img,attackSoundPath) {
        this.id = id;
        this.name = name;
        this.healthPoints = healthPoints;
        this.dexterity = dexterity;
        this.img = img;
        this.attackSoundPath = attackSoundPath;
    },

    CharacterOccurrence: function (charId) {
        this.charId = charId;
        this.number = 0;
        this.numberAlive = 0;
    },

    Inventory: function () {
        this.weight = undefined,
            this.state = {},
            this.bulk = undefined,
            this.money = undefined,
            this.objects = {}
    },

    MainCharacter: function () {
        this.name = undefined,
            this.healthPoints = undefined,
            this.dexterity = undefined,
            this.state = {}
    },

    ObjectInfo: function () {
        this.number = undefined
    },

    PhysicalObject: function (paramId, paramName, paramImgPath) {
        this.id = paramId,
            this.name = paramName,
            this.img = paramImgPath,
            this.attributes = {}
    },

    Story: function () {
        this.date = undefined,
            this.step = undefined,
            this.dataByStep = {}
    },

    World: function () {
        this.objectDictionnary = {},
            this.characterDictionnary = {}
    }
}