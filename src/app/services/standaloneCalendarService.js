(function () {
    'use strict';   
    //TODO: Make this a factory instead of a "Service"
    angular
        .module('app')
        .factory('calendarService', standaloneCalendarService);
    
    standaloneCalendarService.$inject = ['$q'];
    
    function standaloneCalendarService($q){
        var service = {
            getEvents : getEvents
        };
        return service;
    
        //////////
        
        function getEvents(startDate, endDate){
            var deferred = $q.defer();
            
            deferred.resolve({
                title           : "Cheese",
                startDate   : new Date(),
                endDate     : new Date(),
                recurring   : true
            });
            
            return deferred.promise;
        }
    }
    
})();