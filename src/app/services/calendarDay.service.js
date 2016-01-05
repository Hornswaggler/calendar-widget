(function () {
'use strict';

    angular
        .module('app')
        .factory('calendarDayService', calendarDayService);

    calendarDayService.$inject = ['CONST'];
        
    function calendarDayService(CONST){
        
        var calendarDay = function(date){
            this.date = new Date(date);
            this.next = null;
            this.previous = null;
            this.index;
            this.eventSlots = [];
            this.parentCalendar = null;
            //this.cellHeight = CONST.DEFAULT_CELL_HEIGHT;
            this.visibleEvents = CONST.DEFAULT_VISIBLE_EVENTS;
        }
        
        calendarDay.prototype.expandCurrentDay = function(){
            //Mark this cell as the currently expanded cell
            this.parentCalendar.currentExpandedCell = this;

            //How many (more) events do we need to display for this particular day?
            //We don't know how many are currently being displayed (hardcoded as 4 in calendarEventDirective...)
            //Iterate over eventSlots backwards until occupied = true...
            var i = this.eventSlots.length - 1;
            for(; i >= 0; i--){
                if(this.eventSlots[i].occupied){
                    console.log(this.eventSlots[i]);
                    break;
                }
            }

            var visibleEvents = i+1;
            
            this.expandCurrentRow(visibleEvents);
            
        }
        
        calendarDay.prototype.expandCurrentRow = function(visibleEvents){
            console.log(this.index % this.parentCalendar.daysPerRow);

            //Collapse previously expanded cell(s)
            if(this.parentCalendar.currentExpandedCell != null){
                this.parentCalendar.currentExpandedCell.collapseCurrentRow();
            }
            
            //Determine the height required for expanding the row then set it
            //this.setRowHeight(250);
            this.setVisibleRowEvents(visibleEvents);
        }
        
        calendarDay.prototype.collapseCurrentRow = function(){
            this.parentCalendar.currentExpandedCell = null;
            this.setVisibleRowEvents(CONST.DEFAULT_VISIBLE_EVENTS);
        }

        calendarDay.prototype.setVisibleRowEvents = function(visibleEvents){
            this.visibleEvents = visibleEvents;
            
            this.setVisibleRowEventsRight(visibleEvents);
            
            if(this.hasPrevious && this.index % this.parentCalendar.daysPerRow != 0){
                this.previous.setVisibleRowEventsLeft(visibleEvents);
            }
            
            if(this.hasNext && this.index % this.parentCalendar.daysPerRow != (this.parentCalendar.daysPerRow - 1)){
                this.next.setVisibleRowEventsRight(visibleEvents);
            }
        }
        
        calendarDay.prototype.setVisibleRowEventsRight = function(visibleEvents){
            if(this.index % this.parentCalendar.daysPerRow != 0){
                this.visibleEvents = visibleEvents;
                if(this.hasNext()){
                    this.next.setVisibleRowEventsRight(visibleEvents);
                }
            }
        }
        
        calendarDay.prototype.setVisibleRowEventsLeft = function(visibleEvents){
            if(this.index % this.parentCalendar.daysPerRow != (this.parentCalendar.daysPerRow - 1)){
                console.log(visibleEvents);
                console.log(this);
                this.visibleEvents = visibleEvents;
                if(this.hasPrevious()){
                    this.previous.setVisibleRowEventsLeft(visibleEvents);
                }
            }
        }
        
        calendarDay.prototype.cellHeight = function(){
            return this.visibleEvents <= 4 ? CONST.DEFAULT_CELL_HEIGHT : (this.visibleEvents + 1) * 33;
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

                //The magic (Adds an event to the begining of the next row)
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
        
        calendarDay.prototype.setPrevious = function(calendarDay){
            return this.previous = calendarDay;
        }
        
        calendarDay.prototype.hasNext = function(){
            return this.next != null;
        }
        
        calendarDay.prototype.hasPrevious = function(){
            return this.previous !=null;
        }
        
        return calendarDay;

    }
})();