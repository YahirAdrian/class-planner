import moment from "moment";
import { generateId, getParsedLS, updateLS } from "../utils/functions";
import { notEmpty } from "../utils/validations";

class Note{
    constructor(subjectId, title, content){
        if(notEmpty(subjectId) && notEmpty(title) && notEmpty(content)){
            this.id = generateId('note')
            this.subjectId = subjectId
            this.title = title
            this.content = content
            this.createdAt = moment().format("YYYY-MM-DD")

        }else{
            return 'Cannot create the note. Avoid empty values'
        }
    }

    create(){
        if((moment(this.createdAt, "YYYY-MM-DD", true).isValid() || !notEmpty(this.createdAt)) &&
        notEmpty(this.title) && notEmpty(this.subjectId) && notEmpty(this.content)){ //Validate subjectName and ColorId
            // Add the note to LS
            const notes = getParsedLS('notes')
            notes.push(this)
            
            updateLS('notes', notes)

            return true
        }else{
            return 'Cannot create the task. Try not using empty values'
        }
    }

    static edit(id, subjectId, title, content){
        if(notEmpty(id) && notEmpty(subjectId) && notEmpty(title) && notEmpty(content)){
            const notes = getParsedLS('notes')
            let originalIndex
            // Search for the task in the task array
            const noteToEdit = notes.filter((note, index) =>{
                if(note.id === id){
                    originalIndex = index
                    return note
                }
            })[0]

            if(noteToEdit !== undefined){
                // Replace the values
                noteToEdit.subjectId = subjectId
                noteToEdit.title = title
                noteToEdit.createdAt = moment().format("YYYY-MM-DD")
                noteToEdit.content = content
            }else{
                return "Cannot edit the note because it couldn't be found"
            }
            notes[originalIndex] = noteToEdit
            updateLS('notes', notes)
            return true

            
        }else{
            return 'Cannot edit the note. Note not found or invalid note ID'
        }
    }

    static remove(id){
        if(notEmpty(id)){

            const notes = getParsedLS('notes')
            const updatedList = notes.filter(note =>(note.id !== id))
            // Update te localstorage
            updateLS('notes', updatedList)
            return true
        }else{
            return 'Invalid note id to remove'
        }
    }
}

export default Note