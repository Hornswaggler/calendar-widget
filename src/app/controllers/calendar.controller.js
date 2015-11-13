(function () {
    'use strict';   

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', 'CONST','calendarService'];

    function CalendarController($scope, CONST, calendarService){ 
        var vm = this;

        vm.showMenu=false;
        
        vm.goNext = goNext; 
        vm.goPrevious = goPrevious;
        vm.toggleMenu = toggleMenu;
        
        //TODO: Do we really need methods for these things? can't we just hook them up to the const values here?
        vm.daysOfWeek = CONST.DAYS_OF_WEEK;
        //vm.getMonth = getMonth;
        
        vm.calendar = new calendarService();

        activate();
        
        //////////
        
        function activate(){
            
        }
        
        //TODO: This will go to the next month, week , day depeneding on calendar mode...
        //Will probably have to seperate "CURRENT_DATE" from the concept of what
        //Is currently being displayed on the screen
        function goNext(){
            var newDate = new Date(vm.calendar.currentDate);
            newDate.setMonth(newDate.getMonth()+1);
            vm.calendar.setDate(newDate);
        }
        
        function goPrevious(){
            var newDate = new Date(vm.calendar.currentDate);
            newDate.setMonth(newDate.getMonth()-1);
            vm.calendar.setDate(newDate);
        }
        
        function toggleMenu(){
            console.log("Toggling the menu...");
            vm.showMenu = !vm.showMenu;
        }

    }
    
})();