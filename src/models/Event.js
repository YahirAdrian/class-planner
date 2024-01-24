import { generateId, getParsedLS, updateLS } from "../utils/functions"
import { notEmpty, validDateOrEmpty, validTimeOrEmpty, validDate } from "../utils/validations"

class Event{
    constructor(title, date, description, timeStart, timeEnd, important){
        this.id = generateId('event')
        this.title = title
        this.description = description
        this.date = date
        this.timeStart = timeStart
        this.timeEnd = timeEnd
        this.important = important
        
        return this
    }

    create(){
        if(notEmpty(this.title) &&
            this.date.length > 0 && validDate(this.date) &&
            validTimeOrEmpty(this.timeStart) && validTimeOrEmpty(this.timeEnd)
        ){
            const events = getParsedLS('events') !== null ? getParsedLS('events') : []
            events.push(this)
        
            // Update localstorage
            updateLS('events', events)
            return true
        }else{
            return 'Cannot create event. Invalid information'
        }


    }

    static edit(id, title, description, date, timeStart, timeEnd, important){
        debugger
        if(notEmpty(title) && notEmpty(id) && // Validating all the data
            date.length > 0 && validDate(date) &&
            validTimeOrEmpty(timeStart) && validTimeOrEmpty(timeEnd)
        ){
            const events = getParsedLS('events')
            let originalIndex
            const eventToEdit = events.filter((event, index)=>{
                if(event.id === id){
                    originalIndex = index
                    return event
                }
            })[0]

            if(eventToEdit !== undefined){
                // Replace the values
                eventToEdit.title = title
                eventToEdit.description = description
                eventToEdit.date = date
                eventToEdit.timeStart = timeStart
                eventToEdit.timeEnd = timeEnd
                eventToEdit.important = important

                // Update the event in LS
                events[originalIndex] = eventToEdit
                updateLS('events', events)
                return true
            }else{
                return "Couldn't find the event to edit"
            }
        }else{
            return 'Cannot edit the event. Avoid using empty values'
        }
    }

    static remove(id){
        const events = getParsedLS('events')
        if(notEmpty(id) ){
            const eventToRemove = events.filter(event=> (event.id === id))[0]

            if(eventToRemove !== undefined){
                const newList = events.filter(event => (event.id !== eventToRemove.id))

                // Update LS
                updateLS('events', newList)
                return true
            }else{
                return 'Cannot remove the event. Event id not found'
            }
        }else{
            return 'There was a problem was removing the event'
        }
    }

    
}

export default Event