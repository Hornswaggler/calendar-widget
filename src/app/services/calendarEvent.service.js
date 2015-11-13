(function () {
'use strict';

    angular
        .module('app')
        .factory('calendarEventService', calendarEventService);

    function calendarEventService(){
        
        var event = function(startDate, endDate, title, recurring){
            this.startDate = startDate;
            this.endDate = endDate;
            this.title = title;
            this.recurring = recurring;
        }
        
        return event;
    }
    
})();