import { generateId, updateLS, getParsedLS} from './../utils/functions'
import { notEmpty } from '../utils/validations'

class Subject{
    constructor(name, colorId, first=false){
        this.id = first === true ? '1' :  generateId('subject') // If it is the first subject created, it has the id 1
        this.name = name
        this.colorId = colorId
        this.schedule = []

        if(notEmpty(name) && !isNaN(colorId)){ //Validate subjectName and ColorId
            // Add the subject to LS
            const previousSubjects = getParsedLS('subjects')
    
            if(previousSubjects === null ){
                updateLS('subjects', 'create', [this])
            }else{
                updateLS('subjects', 'create', [...previousSubjects, this])
            }
            return true
        }else{
            return 'Cannot create the subject. Try not using empty values'
        }


    }

    edit(newName, newColorId){
        this.name = newName
        this.colorId = newColorId
    }

    editSchedule(schedule){
        this.schedule = schedule
    }

    remove(){
        
    }
}

export default Subject