const constants = require("./constants");


const calculatePrice = (symbolsAmount, language) => {
    const symbolPrice = language === "eng" ?
        constants.language.symbolEnglish :
        constants.language.symbolCyrillic;
    const minimal = language === "eng" ? constants.language.minEnglish : constants.language.minCyrillic;

    const price = symbolsAmount * symbolPrice;
    return Math.round(Math.max(price, minimal));
}


const calculateTime = (symbolsAmount, language) => {
    const symbolTime = language === "eng" ?
        constants.time.symbolsEnglishHour :
        constants.time.symbolsCyrillicHour;

    const time = 1800 + 3600 * (symbolsAmount / symbolTime);
    return Math.max(time, constants.time.minTime) * 1000;
}


const isInWorkingDays = (date) => {
    return date.getDay() >= 1 && date.getDay() <= 5;
}


const isInWorkingHours = (date) => {
    return date.getHours() >= 10 && date.getHours() <= 19;
}


const copyDate = (date) => {
    return new Date(date.getTime());
}


const setNextDayStart = (date) => {
    date.setDate(date.getDate() + 1)
    setWorkingDayStart(date);
}


const setWorkingDayEnd = (date) => {
    date.setHours(constants.time.dayEnd);
    date.setMinutes(0)
    date.setSeconds(0);
}


const getWorkingDayEnd = (date) => {
    const dayEnd = copyDate(date);
    setWorkingDayEnd(dayEnd);
    return dayEnd;

}


const setWorkingDayStart = (date) => {
    date.setHours(constants.time.dayStart);
    date.setMinutes(0)
    date.setSeconds(0);
}


const getWorkingDayStart = (date) => {
    const dayStart = copyDate(date);
    setWorkingDayStart(dayStart);
    return dayStart;

}


const getWorkingTimeRemainedInDay = (date) => {
    const dayEnd = getWorkingDayEnd(date);
    return dayEnd - date;
}


const addTimeToDate = (date, time) => {
    return new Date(date.getTime() + time);
}


const calculateDeadline = (date, timeNeeded) => {
    while (timeNeeded > 0) {
        if (isInWorkingDays(date)) {
            if (date.getHours() < 10) {
                date.setHours(10);
            }
            if (isInWorkingHours(date)) {
                if (timeNeeded <= getWorkingTimeRemainedInDay(date)) {
                    date = addTimeToDate(date, timeNeeded);
                    return date;
                } else {
                    timeNeeded -= getWorkingTimeRemainedInDay(date);
                    setNextDayStart(date);
                }
            } else {
                setNextDayStart(date);
            }
        } else {
            setNextDayStart(date);
        }
    }
}


const processRequest = (request) => {
    const multiplier = request.mimeType === "other" ? 1.2 : 1;
    const timeNeeded = multiplier * calculateTime(request.count, request.language);
    const deadline = calculateDeadline(new Date(), timeNeeded);
    const price = multiplier * calculatePrice(request.count, request.language);

    return JSON.stringify({
        price: price,
        time: (timeNeeded / (3600 * 1000)).toFixed(2),
        deadline: deadline.getTime(),
        deadline_date: deadline.toLocaleString()
    }, null, 3);
}


module.exports = {
    calculatePrice,
    calculateTime,
    calculateDeadline,
    processRequest
}


