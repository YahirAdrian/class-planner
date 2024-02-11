import { generateId, getParsedLS, updateLS } from "../utils/functions"
import { notEmpty, validTime } from "../utils/validations"

class Schedule{
    constructor(subjectId, dayOfWeek, timeStart, timeEnd){
        this.id = generateId('schedule')
        this.subjectId = subjectId
        this.dayOfWeek = dayOfWeek
        this.timeStart = timeStart
        this.timeEnd = timeEnd
    }

    addEvent(){
        if(this.validate(this)){

            const scheduleItems = getParsedLS('schedule')

            if(scheduleItems !== null){
                updateLS('schedule', [...scheduleItems, this])
            }else{
                updateLS('schedule', [this])
            }
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
            eventToEdit.dayOfWeek = updatedEvent.dayOfWeek
            eventToEdit.timeStart = updatedEvent.timeStart
            eventToEdit.timeEnd = updatedEvent.timeEnd

            // Update localStorage

            return true
        }else{
            return 'There was a problem while updating the schedule'
        }
        
    }

    static validateSchedule(event){
        const {id, dayOfWeek, timeStart, timeEnd} = event
        if(notEmpty(id) &&
            (dayOfWeek >=0 && dayOfWeek <=6) &&
            validTime(timeStart) &&
            validTime(timeEnd)
        ){
            return true
        }

        return false
    }

    validate(event){
        const {id, dayOfWeek, timeStart, timeEnd} = event
        if(notEmpty(id) &&
            (dayOfWeek >=0 && dayOfWeek <=6) &&
            validTime(timeStart) &&
            validTime(timeEnd)
        ){
            return true
        }

        return false
    }
}

export default Schedule