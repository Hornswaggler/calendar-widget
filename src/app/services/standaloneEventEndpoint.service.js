(function () {
    'use strict';   

    angular
        .module('app')
        .factory('eventEndpointService', eventEndpointService);
    
    eventService.$inject = ['$q'];
    
    function eventEndpointService($q){
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