(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('event', event);
    
    event.$inject = ['CONST', '$compile'];

    function event(CONST, $compile){

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
                
                var i = 0;
                for(; i < (scope.day.eventSlots.length > 4 ? 4 : scope.day.eventSlots.length); i++){
                    var eachEventSlot = scope.day.eventSlots[i];
                    if(eachEventSlot.event != null){
                        var eachEvent = eachEventSlot.event;
                        var style="width:" + ((100 * eachEventSlot.duration) -4) + "%;left:2%;";
                        
                        element.append('<div ng-click="selectEvent()" class="calendarEvent" style="'+style+'">'+eachEvent.title+'</div>');
                    }else{
                        element.append('<div class="calendarEventPlaceholder">&nbsp;</div>');
                    }
                }
                
                if(scope.day.eventSlots.length > 4){
                    element.append("<div style='position:absolute;z-index:100;right:5px; bottom:5px;'><span class='glyphicon glyphicon-chevron-down glyphicon-button'></span></div>");
                }
                
                $compile(element.contents())(scope);

            });
            
            scope.selectEvent = function(){
                console.log("Event FIRED! BANG!");
                console.log(scope.day);
            }

        }
    }
 
})();