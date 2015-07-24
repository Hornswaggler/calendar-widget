(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('calendar', calendar);
    
    function calendar(){
        var directive = {
            link : link,
            templateUrl : './app/templates/calendar.html',
            restrict : 'EA'
        };
        return directive;
        
        function link(scope,element, attrs){
            
        }
    }
 
})();