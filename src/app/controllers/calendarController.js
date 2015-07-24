(function () {
    'use strict';   

    angular
        .module('app')
        .controller('Calendar', Calendar);

    Calendar.$inject = ['CONST','spService', 'dateOps'];

    function Calendar(CONST, spService, dateOps){ 
        var vm = this;

        vm.goNext = goNext; 
        vm.goPrevious = goPrevious;
        
        vm.getDaysOfWeek = getDaysOfWeek;
        vm.getMonth = getMonth;
        
        vm.currentDate = new Date();
        vm.calendarDays = [];
        
        activate();
        
        //////////
        
        function activate(){
            getCalendarDays();
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
        
        //TODO: Ultimately have this call different factory method(s) depending on view mode
        function getCalendarDays(){
            vm.calendarDays = dateOps.getDaysForMonth(vm.currentDate);
            return vm.calendarDays;
        }

        function getMonth(){
            return CONST.MONTHS[vm.currentDate.getMonth()];
        }
        
        function getDaysOfWeek(){
            return CONST.DAYS_OF_WEEK;
        }
    }
    
})();