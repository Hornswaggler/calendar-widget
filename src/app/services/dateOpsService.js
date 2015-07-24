(function () {
    'use strict';

    angular
        .module('app')
        .factory('dateOps', dateOps);
    
    dateOps.$inject = ['CONST'];
    
    function dateOps(CONST){
        var service = {
            getDaysForMonth : getDaysForMonth
        }
    
        return service;
        
        //////////
    
        function getDaysForMonth(date){
            var year = date.getFullYear();
            var month = date.getMonth();
        
            var firstOfMonth = new Date(year, month, 1);
            firstOfMonth.setDate(firstOfMonth.getDate() - firstOfMonth.getDay())

            var lastOfMonth = new Date(year, month+1, 0);
            lastOfMonth.setDate(lastOfMonth.getDate() +  (6-lastOfMonth.getDay()));

            var ret = [];
            for(var i = new Date(firstOfMonth),j=0; i <= lastOfMonth; i.setDate(i.getDate()+1),j++){
                ret.push(
                    {
                        dayOfWeek: CONST.DAYS_OF_WEEK[j%7],
                        month: i.getMonth(),
                        date: i.getDate(),
                        year: i.getFullYear()
                    }
                );
            }

            return ret;
        }
    
    }
    
})();