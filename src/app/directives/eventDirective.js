(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('event', event);
    
    event.$inject = ['CONST'];

    function event(CONST){

        var directive = {
            link : link,
            //templateUrl : CONST.APP_ROOT + '/templates/event.html',
            restrict : 'EA',
            scope:{
                day : "="
            }
        };
        return directive;
        
        function link(scope,element, attrs){

            var fireCount = 0;
            
            scope.$on(CONST.EVT_EVENTS_LOADED, function(event, args){
                for(var i = 0; i < scope.day.events.length; i++){
                    var eachEvent = scope.day.events[i];
                    element.append('<div class="calendarEvent" style="width:96%;left:2%;margin-bottom:5px;">'+eachEvent.title+'</div>');
                }
            });
            
            //Shitty way of doing it...
            /*scope.$watch(
                "day",
                function(newDay, oldDay){
                    console.log("Fired: " + (++fireCount));
                    for(var i = 0; i < newDay.events.length; i++){
                        var eachEvent = newDay.events[i];
                        element.append('<div>'+eachEvent.title+'</div>');
                    }
                }, true
            );*/

        }
    }
 
})();