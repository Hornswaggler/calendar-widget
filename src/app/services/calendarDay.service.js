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
            //Get next Event Slot
            console.log("Event Duration: ");
            
            //TODO: Move this into the event class (day difference method)
            
            var ONE_DAY = 1000 * 60 * 60 * 24;
            
            // Calculate the difference in milliseconds
            var difference_ms = Math.abs(event.endDate - this.date)

            // Convert back to days and return
            var duration = Math.round(difference_ms/ONE_DAY);
            //console.log(duration);

            
            
            //console.log("Duration before: " + duration);
            var nextIndex = this.getNextEventSlot(0, duration);
            
            this.updateEventIndex(nextIndex, event, duration, true);
            
            //console.log("Duration after: " + duration);
            
            /*var overlap = this.parentCalendar.daysPerRow - (this.index % this.parentCalendar.daysPerRow);
            
            //Does this event roll over into the next calendar row?
            if(duration >= overlap){
                console.log("Overlaps!");
                
            }*/
            
            //Does this overlap into the next week?
        }
        
        calendarDay.prototype.updateEventIndex = function(index, event, duration, setEvent){
            var overlap = this.parentCalendar.daysPerRow - (this.index % this.parentCalendar.daysPerRow)
            
            if(duration <= 0){
                return;
            }else if(overlap === this.parentCalendar.daysPerRow){
                console.log("We're in the next week! add the event here... Something isn't working correctly, adding the event here ends up in recursive purgatory!");
                
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
        
        calendarDay.prototype.occupyEventAtIndex = function(index, event, duration){
            
        }
        
        calendarDay.prototype.getNextEventSlot = function(index, duration){
            /*console.log("Are we at the begining of the week?");
            console.log("Day: " + calendarDay.date);
            console.log("Begining? " + ((calendarDay.index % calendarDay.parentCalendar.daysPerRow)==0));*/
            
            //First Empty Slot in this days
            var i = index;
            for(;i<this.eventSlots.length; i++){
                if(this.eventSlots[i] === null || !this.eventSlots[i].occupied){
                    break;
                }
            }
            
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