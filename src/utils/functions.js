import moment from "moment";

function stringDate(date){
    const dateObject = moment(date)
    const strDate = dateObject.format('MMMM Do YYYY')

    return strDate
}

function generateId(prefix){
    return prefix + "_" + Math.random().toString(16).slice(2)
}

export{
    stringDate,
    generateId
}