let timezoneOffset = +9; //UTC+9

//UTC time to KST time
function utcToKst(utcDate) {
    let kstDate = new Date(new Date(utcDate).getTime() + (timezoneOffset * 1000 * 3600));
    return kstDate;
}

//KST time to UTC time
function kstToUtc(kstDate){
    let utcDate = new Date(new Date(kstDate).getTime() - (timezoneOffset * 1000 * 3600));
    return utcDate;
}

// // Seems that local develop environment runs in UTC timezone.
// console.log(new Date());
// console.log(utcToKst(new Date()));
// console.log(kstToUtc(utcToKst(new Date())));

module.exports = {
    utcToKst, 
    kstToUtc,
}