import moment from "moment";

function notEmptyAndSymbols(value){
    let valid = true;
    const regex = /^[a-zA-Z0-9 ]+$/;
    if(value.length < 1){
        valid = false;
    }
    
    if(regex.test(value) == false){//If there are symbols in the string
        valid = false;
    }

    return valid
}

function notEmpty(value){
    return value.trim() !== ''
}

function isDateValid(dateStr) {
    const dateObj = new Date(dateStr);
    return !isNaN(dateObj);
  }


function validDate(date){
    return moment(date, "YYYY-MM-DD", true).isValid()
}
function validDateOrEmpty(date){
    return(moment(date, "YYYY-MM-DD", true).isValid() || !notEmpty(date))
}

function validTimeOrEmpty(time){
    return true
}

function validTime(time){
    // Define the expected time format
    const format = 'HH:mm';

    // Try to parse the input time using the specified format
    const parsedTime = moment(time, format);

    // Check if the parsed time is valid
    const isValid = parsedTime.isValid();

    return isValid;
}
export {
    notEmptyAndSymbols,
    notEmpty,
    isDateValid,
    validDateOrEmpty,
    validTimeOrEmpty,
    validDate,
    validTime
}