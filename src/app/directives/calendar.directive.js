(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('calendar', calendar);
    
    calendar.$inject = ['CONST'];

    function calendar(CONST){

        var directive = {
            link : link,
            templateUrl : CONST.APP_ROOT + '/templates/calendar.html',
            restrict : 'EA'
        };
        return directive;
        
        function link(scope,element, attrs){
            scope.$on(CONST.EVT_EVENTS_LOADED, function(event, args){
                   console.log("Inside calendar Directive");
            });
        }
    }
 
})();