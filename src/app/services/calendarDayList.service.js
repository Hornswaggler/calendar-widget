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
                this.tail = this.tail.setNext(calendarDay)
            }
            
            console.log("Are we at the begining of the row?");
            console.log("Day: " + calendarDay.date);
            console.log("Begining? " + ((calendarDay.index % calendarDay.parentCalendar.daysPerRow)==0));
            console.log(calendarDay.date.getDay()===0);
        }

        return calendarDayList;

    }
})();