import { generateId, updateLS, getParsedLS} from './../utils/functions'
import { notEmpty } from '../utils/validations'

class Subject{
    constructor(name, colorId, first=false){
        this.id = first === true ? '1' :  generateId('subject') // If it is the first subject created, it has the id 1
        this.name = name
        this.colorId = colorId
        this.schedule = []

    }
    
    create(){
        if(notEmpty(this.name) && !isNaN(this.colorId)){ //Validate subjectName and ColorId
            // Add the subject to LS
            const previousSubjects = getParsedLS('subjects')
    
            if(previousSubjects === null ){
                updateLS('subjects',  [this])
            }else{
                updateLS('subjects', [...previousSubjects, this])
            }
            return true
        }else{
            return 'Cannot create the subject. Try not using empty values'
        }
    }

    static edit(id, newName, newColorId){
        if(notEmpty(id)){
            // Search for the subject in the localstorage 
            const subjects = getParsedLS('subjects')
            let originalIndex
            const subjectToEdit = subjects.filter((subject, index) => {
                if(subject.id === id){
                    originalIndex = index
                    return subject
                }
            })[0]
            if(subjectToEdit !== undefined){
                subjectToEdit.name = newName
                subjectToEdit.colorId = newColorId
                
                // Update in localStorage
                subjects[originalIndex] = subjectToEdit
                updateLS('subjects', subjects)
                return true

            }else{
                return 'Cannot find the subject to be edited'
            }
        }else{
            return 'Invalid id or information'
        }
    }


    static remove(id){
        if(notEmpty(id)){

            const subjects = getParsedLS('subjects')
            const updatedList = subjects.filter(subject =>(subject.id !== id))
            if(updatedList.length >0){
                // Update te localstorage
                updateLS('subjects', updatedList)
                return true
            }else{
                // In case the list is empty when the last subject is removed
                return 'Cannot remove the subject since it is the only one subject of the agenda'
            }
        }else{
            return 'Invalid subject id to remove'
        }
    }

    editSchedule(id, schedule){
        this.schedule = schedule
    }

    
}

export default Subject