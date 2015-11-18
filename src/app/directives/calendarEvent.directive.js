(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('event', event);
    
    event.$inject = ['CONST'];

    function event(CONST){

        var directive = {
            link : link,
            restrict : 'EA',
            scope:{
                day : "="
            }
        };
        
        return directive;
        
        function link(scope,element, attrs){

            var fireCount = 0;
            
            scope.$on(CONST.EVT_EVENTS_LOADED, function(event, args){
            
                
                for(var i = 0; i < scope.day.eventSlots.length; i++){
                    var eachEventSlot = scope.day.eventSlots[i];
                    if(eachEventSlot.event != null){
                        var eachEvent = eachEventSlot.event;
                        var style="width:" + ((100 * eachEventSlot.duration) -4) + "%;left:2%;";
                    
                        element.append('<div class="calendarEvent" style="'+style+'">'+eachEvent.title+'</div>');
                    }else{
                        element.append('<div class="calendarEventPlaceholder">&nbsp;</div>');
                    }
                }

            });

        }
    }
 
})();