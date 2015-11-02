(function () {
    'use strict';   

    angular
        .module('app')
        .controller('Calendar', Calendar);

    Calendar.$inject = ['CONST','calendarService', 'dateOps'];

    function Calendar(CONST, calendarService, dateOps){ 
        var vm = this;

        vm.showMenu=false;
        
        vm.goNext = goNext; 
        vm.goPrevious = goPrevious;
        vm.toggleMenu = toggleMenu;
        
        vm.getDaysOfWeek = getDaysOfWeek;
        vm.getMonth = getMonth;
        
        vm.currentDate = new Date();
        vm.calendarDays = [];
        
        vm.events = [];
        
        activate();
        
        //////////
        
        function activate(){
            getCalendarDays();
            getEvents();
        }
        
        //TODO: This will go to the next month, week , day depeneding on calendar mode...
        //Will probably have to seperate "CURRENT_DATE" from the concept of what
        //Is currently being displayed on the screen
        function goNext(){
            vm.currentDate.setMonth(vm.currentDate.getMonth()+1);
            getCalendarDays();
        }
        
        function goPrevious(){
            vm.currentDate.setMonth(vm.currentDate.getMonth()-1);
            getCalendarDays();
        }
        
        function toggleMenu(){
            console.log("Toggling the menu...");
            vm.showMenu = !vm.showMenu;
        }
        
        //TODO: Ultimately have this call different factory method(s) depending on view mode
        function getCalendarDays(){
            vm.calendarDays = dateOps.getDaysForMonth(vm.currentDate);
            
            return vm.calendarDays;
        }
        
        function getEvents(){
            if(vm.calendarDays.length >0){
                calendarService.getEvents(
                        vm.calendarDays[0].date,
                        vm.calendarDays[vm.calendarDays.length-1].date)
                    .then(function(events){
                        vm.events = events;
                        mergeEvents();
                    }); 
            }else{
                vm.events = [];
            }
            
            return vm.events;
        }

        /** 
         * Merges Events with Calendar Days, splits events into amount of 
         * divs required to display in current view
         */
        function mergeEvents(){
            //TODO: for each row... dependent on view mode...
            for(var i = 0; i < vm.calendarDays.length; i++){
                var eachCalendarDay = vm.calendarDays[i];
                
                for(var j = 0; j < vm.events.length; j++){
                    var eachEvent = vm.events[j];
                    
                    
                  //  if(i%7===0){
                        //Anything w/ a start date on or before this date and end date on or after, starts here...
                        //TODO: Should be number of columns! (not just 7...)
                        if(i%7===0 && eachEvent.startDate.getTime() <= eachCalendarDay.date.getTime()
                                && eachEvent.endDate.getTime() >= eachCalendarDay.date.getTime()){//AND END DATE!!!!){
                            eachCalendarDay.events.push(eachEvent);
                        }
                        if(i%7!=0 && eachEvent.startDate.getTime() === eachCalendarDay.date.getTime()){
                            eachCalendarDay.events.push(eachEvent);
                        }
                   // }else{
                        //Only ones w/ this specific start date
                   // }
                }
            }
            
            var i = 0;
            i++;
        }
        
        function getMonth(){
            return CONST.MONTHS[vm.currentDate.getMonth()];
        }
        
        function getDaysOfWeek(){
            return CONST.DAYS_OF_WEEK;
        }
    }
    
})();