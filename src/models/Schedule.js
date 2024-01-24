import { updateLS } from "../utils/functions"
import { notEmpty, validTime } from "../utils/validations"

class Schedule{
    constructor(subjectId, events=[]){
        this.subjectId = subjectId
        this.events = events
    }

    addEvent(event){
        if(this.validateEvent(event)){

            this.events.push(event)
        }

        return "There was a problem while creating the event"
    }

    removeEvent(eventId){
        const newList = this.events.filter(event => (event.id === eventId))

        if(newList.length === 1){
            // If the event is found
            // Replace the list of events
            this.events = newList
            return true
        }else{
            return "Couldn't eliminate the subject schedule. There's a problem with the event ID"
        }
        
        
    }
    
    updateEvent(eventId, updatedEvent){
        let eventIndex
        const eventToEdit = this.events.filter((event, index) => {
            if(event.id === eventId){
                eventIndex = index
                return event
            }
        })[0]

        if(eventToEdit !== undefined && this.validateEvent(updatedEvent)){
            // Update the event
            eventToEdit.day = updatedEvent.day
            eventToEdit.timeStart = updatedEvent.timeStart
            eventToEdit.timeEnd = updatedEvent.timeEnd

            // Update localStorage

            return true
        }else{
            return 'There was a problem while updating the schedule'
        }
        
    }

    validateEvent(event){
        const {id, day, timeStart, timeEnd} = event
        if(notEmpty(id) &&
            (day >=0 && day <=4) &&
            validTime(timeStart) &&
            validTime(timeEnd)
        ){
            return true
        }

        return false
    }
}

export default Schedule