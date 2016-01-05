(function () {
'use strict';

    angular
        .module('app')
        .factory('calendarDayListService', calendarDayListService);

    calendarDayListService.$inject = ['calendarDayService'];
    
    function calendarDayListService(calendarDayService){
        
        var calendarDayList = function(parentCalendar){
            this.parentCalendar = parentCalendar;
            this.clear();
        }
        
        calendarDayList.prototype.clear = function(){
            this.head = null;
            this.tail  = null;

            //Still need to track to an array so that the list may be used w/ ng-repeat
            this.array = [];
        }
        
        calendarDayList.prototype.add = function(calendarDay){
        
            calendarDay.parentCalendar = this.parentCalendar;
            calendarDay.index = this.array.length;
            this.array.push(calendarDay);
            
            if(this.head === null){
                this.head = calendarDay;
                this.tail = calendarDay;
            }else{
                calendarDay.setPrevious(this.tail);
                this.tail = this.tail.setNext(calendarDay);
            }
            
        }

        return calendarDayList;

    }
})();