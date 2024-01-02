import moment from "moment";

function stringDate(date){
    const dateObject = moment(date)
    const strDate = dateObject.format('MMMM Do YYYY')

    return strDate
}

function generateId(prefix){
    return prefix + "_" + Math.random().toString(16).slice(2)
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function updateLS(key, action, value){
    switch(action){
        case 'create':
            localStorage.setItem(key, JSON.stringify(value))
            break;
        case 'update':
            // Update
            break;
        case 'edit':
            // Edit
        break;
        case 'delete':
            // Delete
        break;

        default:
            console.error("Action not found, try with the values 'create', 'update', 'edit', or 'delete'")
    }
}

function getParsedLS(key){
    return JSON.parse(localStorage.getItem(key))
}

export{
    stringDate,
    generateId,
    capitalize,
    updateLS,
    getParsedLS
}