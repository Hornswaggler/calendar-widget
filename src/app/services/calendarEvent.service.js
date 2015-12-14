(function () {
'use strict';

    angular
        .module('app')
        .factory('calendarEventService', calendarEventService);

    function calendarEventService(){
        
        var event = function(startDate, endDate, title, recurring, location, description, category, allDayEvent){
            this.startDate = startDate;
            this.endDate = endDate;
            this.title = title;
            this.recurring = recurring;
            this.location = location;
            this.description = description;
            this.category = category;
            this.allDayEvent = allDayEvent;
        }
        
        return event;
    }
    
})();