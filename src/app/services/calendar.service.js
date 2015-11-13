(function () {
    'use strict';

    angular
        .module('app')
        .factory('calendarService', calendarService);
    
    calendarService.$inject = ['$rootScope', 'CONST', 'eventEndpointService', 'calendarDayService', 'calendarDayListService'];
    
    function calendarService($rootScope, CONST, eventEndpointService, calendarDayService, calendarDayListService){
    
        var calendar = function(){
            this.currentDate = new Date();
            this.calendarDays = new calendarDayListService(this);
            
            this.daysPerRow = 7;
            
            this.events = [];
            
            this.activate();
        }
        
        calendar.prototype.currentMonth = function(){
             return CONST.MONTHS[this.currentDate.getMonth()]
        }
        
        calendar.prototype.activate = function(){
            this.refresh();
        }
        
        calendar.prototype.refresh = function(){
            this.refreshDays();
            this.refreshEvents();
        }
        
        calendar.prototype.setDate = function(newDate){
            this.currentDate = newDate;
            this.refresh();
        }
        
        calendar.prototype.refreshDays = function(){

            var firstOfMonth = this.firstDayOfMonth(this.currentDate);
            var lastOfMonth = this.lastDayOfMonth(this.currentDate);
            
            this.calendarDays.clear();
            for(var eachDate = new Date(firstOfMonth),j=0; eachDate <= lastOfMonth; eachDate.setDate(eachDate.getDate()+1),j++){
                this.calendarDays.add(new calendarDayService(eachDate));
            }
        }

        calendar.prototype.refreshEvents = function(){
            var self = this;
            if(this.calendarDays.array.length>0){
                eventEndpointService.getEvents(
                        this.calendarDays.head.date,
                        this.calendarDays.tail.date)
                .then(function(events){
                    self.events = events;
                    self.mergeEvents();
                }); 
            }else{
                this.events = [];
            }
        }
        
        calendar.prototype.mergeEvents = function(){

            for(var i = 0; i < this.calendarDays.array.length; i++){
                var eachDay = this.calendarDays.array[i];
                console.log(eachDay);
                
                for(var j = 0; j < this.events.length; j++){
                    var eachEvent = this.events[j];
                    
                    //Anything w/ a start date on or before this date and end date on or after, starts here...
                    //TODO: Should be number of columns! (not just 7...)
                    if(i%this.daysPerRow===0 && eachEvent.startDate.getTime() <= eachDay.date.getTime()
                            && eachEvent.endDate.getTime() >= eachDay.date.getTime()){//AND END DATE!!!!){
                        
                        eachDay.addEvent(eachEvent);
                    }
                    
                    else if(eachEvent.startDate.getMonth() === eachDay.date.getMonth() 
                            && eachEvent.startDate.getDate() === eachDay.date.getDate()
                            && eachEvent.startDate.getUTCFullYear() === eachDay.date.getUTCFullYear()){

                        eachDay.addEvent(eachEvent);
                    }
                    
                }
            }

            $rootScope.$broadcast(CONST.EVT_EVENTS_LOADED);
        }
        
        calendar.prototype.firstDayOfMonth = function(date){
            var firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            firstOfMonth.setDate(firstOfMonth.getDate() - firstOfMonth.getDay())
            return firstOfMonth;
        }
        
        calendar.prototype.lastDayOfMonth = function(date){
            var lastOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
            lastOfMonth.setDate(lastOfMonth.getDate() +  (6-lastOfMonth.getDay()));
            return lastOfMonth;
        }

        return calendar;
    
    }
    
})();