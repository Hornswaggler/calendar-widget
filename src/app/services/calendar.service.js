(function () {
    'use strict';

    angular
        .module('app')
        .factory('calendarService', calendarService);
    
    calendarService.$inject = ['$rootScope', 'CONST', 'eventService'];
    
    function calendarService($rootScope, CONST, eventService){
    
        var calendar = function(){
            var self = this;
            
            self.calendarDay = new Date();
            self.calendarDays = [];
            
            self.events = [];
            
            activate();
            
            //////////
            
            function currentMonth(){
                 return CONST.MONTHS[self.currentDate.getMonth()]
            }
            
            function activate(){
                refresh();
            }
            
            function refresh(){
                self.calendarDays = getDaysForMonth(new Date());
                refreshEvents();
            }
            
            function refreshEvents(){
                if(self.calendarDays.length >0){
                    eventService.getEvents(
                            self.calendarDays[0].date,
                            self.calendarDays[self.calendarDays.length-1].date)
                    .then(function(events){
                        self.events = events;
                        mergeEvents();
                    }); 
                }else{
                    self.events = [];
                }
            }
            
            function mergeEvents(){
                //TODO: for each row... dependent on view mode...
                for(var i = 0; i < self.calendarDays.length; i++){
                    var eachCalendarDay = self.calendarDays[i];
                    
                    for(var j = 0; j < self.events.length; j++){
                        var eachEvent = self.events[j];
                        
                        
                      //  if(i%7===0){
                            //Anything w/ a start date on or before this date and end date on or after, starts here...
                            //TODO: Should be number of columns! (not just 7...)
                            if(i%7===0 && eachEvent.startDate.getTime() <= eachCalendarDay.date.getTime()
                                    && eachEvent.endDate.getTime() >= eachCalendarDay.date.getTime()){//AND END DATE!!!!){
                                eachCalendarDay.events.push(eachEvent);
                            }
                            
                            
                            else if(eachEvent.startDate.getMonth() === eachCalendarDay.date.getMonth() 
                                    && eachEvent.startDate.getDate() === eachCalendarDay.date.getDate()
                                    && eachEvent.startDate.getUTCFullYear() === eachCalendarDay.date.getUTCFullYear()){
                                eachCalendarDay.events.push(eachEvent);
                            }

                            /*if(i%7!=0 && eachEvent.startDate.getTime() === eachCalendarDay.date.getTime()){
                                eachCalendarDay.events.push(eachEvent);
                            }*/
                            
                       // }else{
                            //Only ones w/ this specific start date
                       // }
                    }
                }

                $rootScope.$broadcast(CONST.EVT_EVENTS_LOADED);
            }
        }
        
        return calendar;
    
       

        //Keep this "Static" for now in the event that we might want to expose it as a utility function outside the scope of this controller...
        function getDaysForMonth(date){
            
            var year = date.getFullYear();
            var month = date.getMonth();
        
            var firstOfMonth = new Date(year, month, 1);
            firstOfMonth.setDate(firstOfMonth.getDate() - firstOfMonth.getDay())

            var lastOfMonth = new Date(year, month+1, 0);
            lastOfMonth.setDate(lastOfMonth.getDate() +  (6-lastOfMonth.getDay()));

            var ret = [];
            for(var eachDate = new Date(firstOfMonth),j=0; eachDate <= lastOfMonth; eachDate.setDate(eachDate.getDate()+1),j++){
                ret.push(
                    {
                        date: new Date(eachDate),
                        dayOfWeek: CONST.DAYS_OF_WEEK[j%7],
                        day: eachDate.getDate(),
                        month: eachDate.getMonth(),
                        year: eachDate.getFullYear(),
                        events:[]
                    }
                );
            }

            return ret;
        }
    
    }
    
})();