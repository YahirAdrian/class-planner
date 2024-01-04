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

function updateLS(key, value){
    localStorage.setItem(key, JSON.stringify(value))
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