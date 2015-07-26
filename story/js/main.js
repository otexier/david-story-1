agbeServices.factory('agbeAdapter', ['$log', function (log) {

    var agbeAdapter = {

        agbeService : undefined,

        createStartCharacter: function () {
            var newCharacter = new agbeEntities.MainCharacter();
            newCharacter.name="Le disparu";
            newCharacter.dexterity = 12;
            newCharacter.healthPoints = 20;
            newCharacter.maxHealthPoints = 20;
            return newCharacter;
        },

        createStartInventory: function () {
            var newInventory = new agbeEntities.Inventory();
            return newInventory;
        },

        createStartStory: function (story) {
            story.step = "start";
            story.date = new Date(2014, 01, 01, 12, 0, 0, 0);
            return story;
        },

        createStartWorld: function () {
            var newWorld = new agbeEntities.World();
            agbeAdapter.agbeService.registerObject(newWorld,new agbeEntities.PhysicalObject('knife', 'Couteau', 'objects/knife.png'));
            agbeAdapter.agbeService.registerCharacter(newWorld,new agbeEntities.Character('crab', 'Le méchant crabe', 11,10,'characters/crab.png','sound/sword.mp3'));
            agbeAdapter.agbeService.registerCharacter(newWorld,new agbeEntities.Character('spider', 'Une immense araignée', 15,10,'characters/spider.png','sound/sword.mp3'));
            agbeAdapter.agbeService.registerCharacter(newWorld,new agbeEntities.Character('snake', 'Un immense serpent', 18,10,'characters/snake.jpg','sound/sword.mp3'));
            agbeAdapter.agbeService.registerCharacter(newWorld,new agbeEntities.Character('dragon', 'Un monstrueux dragon', 25,13,'characters/dragon.png','sound/sword.mp3'));
            agbeAdapter.agbeService.registerCharacter(newWorld,new agbeEntities.Character('dragon_affaibli', 'Le dragon affaibli', 22,12,'characters/dragon.png','sound/sword.mp3'));
            return newWorld;
        }
    }

    return agbeAdapter;
}]);