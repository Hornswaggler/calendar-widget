(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('event', event);
    
    event.$inject = ['CONST', '$compile', '$rootScope', '$timeout'];

    function event(CONST, $compile, $rootScope, $timeout){

        var directive = {
            link : link,
            restrict : 'EA',
            scope:{
                day : "="
            },
            template: '<div class="staticRows"></div><div class="dynamicRows"></div>'
        };
        
        return directive;
        
        function link(scope,element, attrs){

            var fireCount = 0;
            var staticRows =  angular.element(element.children()[0]);
            var dynamicRows = angular.element(element.children()[1]);
            
            scope.$on(CONST.EVT_EVENTS_LOADED, function(event, args){
                staticRows.html("");
                
                renderElements(staticRows,0);
                
                $compile(element.contents())(scope);

            });
            
            scope.$on(CONST.EVT_EVENTS_UPDATED, function(event, args){
                dynamicRows.html("");

                renderElements(dynamicRows, CONST.DEFAULT_VISIBLE_EVENTS);
                
                $compile(dynamicRows.contents())(scope);
            });
            
            function renderElements(parentElement, eventIndex){

                var i = eventIndex;
                for(; i < (scope.day.eventSlots.length > CONST.DEFAULT_VISIBLE_EVENTS ? scope.day.visibleEvents : scope.day.eventSlots.length); i++){

                    var eachEventSlot = scope.day.eventSlots[i];
                    if(eachEventSlot && eachEventSlot.event != null){
                        var eachEvent = eachEventSlot.event;
                        var style="width:" + ((100 * eachEventSlot.duration) -4) + "%;left:2%;";
                        
                        parentElement.append('<div ng-click="selectEvent()" class="calendarEvent animated fadeIn" style="'+style+'">'+eachEvent.title+'</div>');
                    }else{
                        parentElement.append('<div class="calendarEventPlaceholder">&nbsp;</div>');
                    }
                }
                
                if(scope.day.eventSlots.length > scope.day.visibleEvents){
                    dynamicRows.append("<div style='position:absolute;z-index:100;right:5px; bottom:5px;'><span ng-click='expandCurrentDay()' class='glyphicon glyphicon-chevron-down glyphicon-button'></span></div>");
                }else if(scope.day.visibleEvents > CONST.DEFAULT_VISIBLE_EVENTS){
                    dynamicRows.append("<div style='position:absolute;z-index:100;right:5px; bottom:5px;'><span ng-click='collapseCurrentDay()' class='glyphicon glyphicon-chevron-up glyphicon-button'></span></div>");
                }
            }
                
            
            //TODO: Have this emit an event instead of calling this directly... maybe...
            scope.selectEvent = function(){
                console.log("Event Selected, I'm not really sure which one... We'll figure that out later...");
                scope.$emit(CONST.EVT_EVENTS_LOADED);
            }
            
            scope.expandCurrentDay = function(){
                scope.day.expandCurrentDay();
                
                //We could capture the animation end event in javascript, or take this lazy way out!
                $timeout( function(){$rootScope.$broadcast(CONST.EVT_EVENTS_UPDATED);}, 200 );

            }
            
            scope.collapseCurrentDay = function(){
                scope.day.collapseCurrentRow();
                $rootScope.$broadcast(CONST.EVT_EVENTS_UPDATED);
            }

        }
    }
 
})();