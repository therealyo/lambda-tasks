const fs = require("fs");


const readJSON = async (pathJSON) => {
    const data = await fs.promises.readFile(pathJSON, "utf-8");
    return JSON.parse(data);
}


const getId = (user) => {
    return user.user._id;
}


const getVacationDates = (user) => {
    return {
        startDate: user.startDate,
        endDate: user.endDate
    }
}


const isInUsers = (users, id) => {
    for (let user of users){
        if (user.id === id){
            return true;
        }
    }
    return false
}


const addToOccurrence = (occurrences, userObject) => {
    if (isInUsers(occurrences, userObject.id)) {
        const indx = occurrences.findIndex(user => {
            return user.id === userObject.id;
        });
        occurrences[indx].vacations.push(userObject.vacations[0]);
    } else {
        occurrences.push(userObject);
    }
}


const findAllOccurrence = (users) => {
    const occurrences = [];
    for (let userJSON of users) {
        const userObject = {
            id: getId(userJSON),
            name: userJSON.user.name,
            vacations: [getVacationDates(userJSON)]
        };
        addToOccurrence(occurrences, userObject);
    }

    return occurrences;
}


const writeResults = (results) => {
    fs.writeFile("results.json", results, "utf8", (err) => {
        if (err) throw err;
        console.log("SavedResults")
    });
}


const main = async () => {
    const vacationsData = await readJSON("vacations.json");
    const occurrences = findAllOccurrence(vacationsData);
    writeResults(JSON.stringify(occurrences));
}

main();