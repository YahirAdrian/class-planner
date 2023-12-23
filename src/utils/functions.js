import moment from "moment";

function stringDate(date){
    const dateObject = moment(date)
    const strDate = dateObject.format('MMMM Do YYYY')

    return strDate
}

export{
    stringDate
}