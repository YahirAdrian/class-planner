import { generateId, getParsedLS, updateLS } from "../utils/functions"
import { notEmpty, validTime } from "../utils/validations"

class ScheduleEvent{
    constructor(subjectId, day, timeStart, timeEnd){
        if(notEmpty(this.day >= 0 && this.day <=4 && validTime(timeStart) && validTime(timeEnd))){
            this.id = generateId('schedule')
            this.day = day
            this.timeStart = timeStart
            this.timeEnd = timeEnd
            if(notEmpty(subjectId) && this.validSubject(subjectId)){
                this.subjectId = subjectId
            }
        }
    }

    add(){
        if(this.isValid(this)){
            const subjects = getParsedLS('subjects')
            const changedSchedule =  subjects.map(subject=>{
                if(subject.id == this.subjectId){
                    subject.schedule.push(this)
                }
            })

            // Update to the LS
            console.log(changeSchedule)

            updateLS('subjects', changedSchedule)
            return true
        }

        return false
    }


    static edit(id, newDay, newTimeStart, newTimeEnd){
        // Find the scheduleItem
        const subjects = getParsedLS('subjects')
        let scheduleToEdit, subjectId, subjectIndex
        subjects.forEach(subject => {
            const schedule = subject.schedule.filter((subject, index) => (schedule.id === id))
            if(schedule.length > 0){
                scheduleToEdit.push(schedule[0])
                subjectId = subject.id
                subjectIndex = index
            }
        })

        // Edit the schedule
        if(scheduleToEdit !== undefined){
            scheduleToEdit.day = newDay
            scheduleToEdit.timeStart = newTimeStart
            scheduleToEdit.timeEnd = newTimeEnd
        }

        // Update in LS
        // const newList = subjects[subjectIndex].schedule[0]
    }

    validSubject(subjectId){
        const subjects = getParsedLS('subjects')
        if(subjects.filter(subject=>(subject.id === subjectId)).length >0){
            return true
        }

        return false
    }

    validSchedule(){
        // Do a verification if all the values are correct
        if(this.validSubject(this.subjectId)
            && this.day >=0 && this.day <=4
            && notEmpty(this.id)
            && validTime(this.timeStart)
            && validTime(this.timeEnd)
        ){
            return true
        }

        return false
    }
}


export default ScheduleEvent