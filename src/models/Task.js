import { generateId, getParsedLS, updateLS } from '../utils/functions'
import { validDateOrEmpty, notEmpty } from '../utils/validations'
import moment from 'moment'

class Task{
    constructor(name, subjectId, deadline, important){
        this.id = generateId('task')
        this.name = name
        this.subjectId = subjectId
        this.important = important
        this.deadline = deadline
    }

    create(){
        if(validDateOrEmpty(this.deadline) &&
        notEmpty(this.name) && notEmpty(this.subjectId)){ //Validate subjectName and ColorId
            // Add the task to LS
            const tasks = getParsedLS('tasks')
            tasks.push(this)
            
            updateLS('tasks', tasks)

            return tasks
        }else{
            return 'Cannot create the task. Try not using empty values'
        }
    }

    static edit(id, newSubjectId, newName, newDeadline, newImportant){
        if(notEmpty(id) && notEmpty(newSubjectId) && notEmpty(newName)
            && (moment(newDeadline, "YYYY-MM-DD", true).isValid() || !notEmpty(newDeadline)))
        {
            const tasks = getParsedLS('tasks')
            let originalIndex
            // Search for the task in the task array
            const taskToEdit = tasks.filter((task, index) =>{
                if(task.id === id){
                    originalIndex = index
                    return task
                }
            })[0]

            if(taskToEdit !== undefined){
                // Replace the values
                taskToEdit.subjectId = newSubjectId
                taskToEdit.name = newName
                taskToEdit.deadline = newDeadline
                taskToEdit.important = newImportant
            }else{
                return "Cannot edit the task because it couldn't be found"
            }
            tasks[originalIndex] = taskToEdit
            updateLS('tasks', tasks)
            return true

            
        }else{
            return 'Cannot edit the task. Task not found or invalid task ID'
        }
    }

    static remove(id){
        
        if(notEmpty(id)){

            const tasks = getParsedLS('tasks')
            const updatedList = tasks.filter(task =>(task.id !== id))
            // Update te localstorage
            updateLS('tasks', updatedList)
            return true
        }else{
            return 'Invalid subject id to remove'
        }
    }
}

export default Task