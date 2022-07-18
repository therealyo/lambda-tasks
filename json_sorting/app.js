const fs = require("fs");
const axios = require("axios");


const readEndpoints = async () => {
    const endpoints = await fs.promises.readFile("endpoints.json", "utf8");
    return JSON.parse(endpoints);
}


const getInfoFromEndpoint = async (endpoint) => {
    return await axios.get(endpoint)
}

const getAllObjectsInJSON = (json) => {
    const objects = [];
    const values = Object.values(json);
    values.forEach(value => {
        if (value instanceof Object){
            objects.push(value);
        }
    })
    return objects;
}

const findIsDone = (json) => {
    const keys = Object.keys(json);
    if (keys.includes("isDone")){
        return json["isDone"];
    } else {
        const objectValues = getAllObjectsInJSON(json);
        for(let value of objectValues){
            const isDone = findIsDone(value);
            if (isDone !== undefined) return isDone;
        }
    }
}


const iterateEndpoints = async (endpoints) => {
    const isDoneCounter = {
        "true": 0,
        "false": 0
    }
    let result = "";


    for (let endpoint of endpoints) {
        const info = await getInfoFromEndpoint(endpoint);
        const data = info.data;
        const isDone = findIsDone(data);
        result += `${endpoint}: isDone=${isDone}\n`;
        isDoneCounter[`${isDone}`] += 1;
    }

    result += `Значений true: ${isDoneCounter["true"]}\n Значений false: ${isDoneCounter["false"]}`
    return result;
}


const writeResults = (results) => {
    fs.writeFile("README.md", results.replaceAll("\n", "<br />"), "utf8", (err) => {
        if (err) throw err;
        console.log("SavedResults")
    });
}


const main = async () => {
    const endpoints = await readEndpoints();
    const result = await iterateEndpoints(endpoints);
    writeResults(result);
}


main();