(function () {
'use strict';

    angular
        .module('app')
        .factory('calendarDayService', calendarDayService);

    function calendarDayService(){
        
        var calendarDay = function(/*calendar, previousSibling, nextSibling,*/ date){
            this.date = new Date(date);
            this.next = null;
            this.index;
            this.eventSlots = [];
            this.parentCalendar = null;
        }
        
        calendarDay.prototype.addEvent = function(event){
            //Get the duration of this event
            var duration = this.parentCalendar.getDayDifference(this.date, event.endDate);
            
            //Find the next available slot ensuring it doesn't overlap other events in the same row
            var nextIndex = this.getNextEventSlot(0, duration);
            
            //Add the event and mark the slots as occupied on the same row
            this.updateEventIndex(nextIndex, event, duration, true);

        }
        
        calendarDay.prototype.updateEventIndex = function(index, event, duration, setEvent){
            var overlap = this.parentCalendar.daysPerRow - (this.index % this.parentCalendar.daysPerRow)
            
            if(duration <= 0){
                return;
            }else if(overlap === this.parentCalendar.daysPerRow && !setEvent){

                //The magic
                this.addEvent(event);
                
                return;
            }
        
            //Initialize the events array to the appropriate length
            if(this.eventSlots.length<(index+1)){
                for(var i = this.eventSlots.length ; i <= index; i++){
                    this.eventSlots.push(
                        {
                            occupied : false,
                            event: null,
                            duration: null
                        }
                    );
                }
            }
            
            this.eventSlots[index].occupied = true;
            
            if(setEvent){
                this.eventSlots[index].event = event;
            
                var overlap = this.parentCalendar.daysPerRow - (this.index % this.parentCalendar.daysPerRow);
                
                if(duration > overlap){
                    this.eventSlots[index].duration = overlap;
                }else{
                    this.eventSlots[index].duration  = duration;
                }
            }
            
            if(this.hasNext()){
                this.next.updateEventIndex(index, event, --duration, false);
            }

        }

        calendarDay.prototype.getNextEventSlot = function(index, duration){
            //First Empty Slot on this day
            var i = index;
            for(;i<this.eventSlots.length; i++){
                if(this.eventSlots[i] === null || !this.eventSlots[i].occupied){
                    break;
                }
            }
            
            //First empty slot in the rest of the row
            if((this.index % this.parentCalendar.daysPerRow)==0){
                return i;
            }else if(this.hasNext() && duration > 0){
                return this.next.getNextEventSlot(i, --duration);
            }
            
            return i;
        }
        
        calendarDay.prototype.setNext = function(calendarDay){
            return this.next = calendarDay;
        }
        
        calendarDay.prototype.hasNext = function(){
            return this.next != null;
        }
        
        return calendarDay;

    }
})();