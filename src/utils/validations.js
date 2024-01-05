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
export {
    notEmptyAndSymbols,
    notEmpty,
    isDateValid
}