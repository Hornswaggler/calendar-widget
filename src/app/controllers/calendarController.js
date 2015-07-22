(function () {
    'use strict';   

    angular
        .module('app')
        .controller('Calendar', Calendar);

    Calendar.$inject = ['CONST','spService'];

    function Calendar(CONST, spService){
        var vm = this;

        vm.currentDate = new Date();
        vm.daysOfWeek = daysOfWeek;
        vm.daysForMonth = daysForMonth;

        daysForMonth();
        
        //////////
        
        function daysForMonth(){
            var year = vm.currentDate.getFullYear();
            var month = vm.currentDate.getMonth();
        
            var firstOfMonth = new Date(year, month, 1);
            firstOfMonth.setDate(firstOfMonth.getDate() - firstOfMonth.getDay())

            var lastOfMonth = new Date(year, month+1, 0);
            lastOfMonth.setDate(lastOfMonth.getDate() +  (6-lastOfMonth.getDay()));

            var ret = [];
            for(var i = new Date(firstOfMonth),j=0; i <= lastOfMonth; i.setDate(i.getDate()+1),j++){

                var dayOfWeek = j%7;
                if(dayOfWeek===0){
                    ret.push([]);
                }
                
                ret[ret.length-1].push(
                    {
                        dayOfWeek: CONST.DAYS_OF_WEEK[dayOfWeek],
                        month: i.getMonth(),
                        date: i.getDate()
                    }
                );
            }
            console.log(ret);
            return ret;
        }
        
        function daysOfWeek(){
            return CONST.DAYS_OF_WEEK;
        }
    }
    
})();