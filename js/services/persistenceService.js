agbeServices.factory('persistenceService', ['$log', function ($log) {

    function dateMemberReviver(key, value) {
        if ((key.indexOf("date", key.length - 4) !== -1)) {
            return new Date(value);
        }
        return value;
    }

    var persistenceService = {



        objectToPersistence : function(key,objectToBePersisted) {
            $log.log("persistenceService.objectToPersistence key="+key+" objectToBePersisted="+objectToBePersisted);
            localStorage.setItem(key,JSON.stringify(objectToBePersisted));
        },

        objectFromPersistence : function(key) {
            var resultString = localStorage.getItem(key);
            var result = JSON.parse(resultString,dateMemberReviver);
            $log.log("persistenceService.objectFromPersistence : key="+key+" returns "+result);
            return result;
        }

    }
    return persistenceService;
}]);
