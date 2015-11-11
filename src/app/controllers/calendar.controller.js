(function () {
    'use strict';   

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', 'CONST','calendarService', 'eventService'];

    function CalendarController($scope, CONST, calendarService, eventService){ 
        var vm = this;

        vm.showMenu=false;
        
        vm.goNext = goNext; 
        vm.goPrevious = goPrevious;
        vm.toggleMenu = toggleMenu;
        
        //TODO: Do we really need methods for these things? can't we just hook them up to the const values here?
        vm.daysOfWeek = CONST.DAYS_OF_WEEK;
        vm.getMonth = getMonth;
        
        vm.calendar = new calendarService();

        activate();
        
        //////////
        
        function activate(){
            
        }
        
        //TODO: This will go to the next month, week , day depeneding on calendar mode...
        //Will probably have to seperate "CURRENT_DATE" from the concept of what
        //Is currently being displayed on the screen
        function goNext(){
            vm.currentDate.setMonth(vm.currentDate.getMonth()+1);
            refresh();
        }
        
        function goPrevious(){
            vm.currentDate.setMonth(vm.currentDate.getMonth()-1);
            refresh();
        }
        
        function toggleMenu(){
            console.log("Toggling the menu...");
            vm.showMenu = !vm.showMenu;
        }

    }
    
})();