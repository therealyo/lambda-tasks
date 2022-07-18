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


const getIsDone = async (endpoint) => {
    const info = await getInfoFromEndpoint(endpoint);
    const data = info.data;
    return findIsDone(data);
}


const iterateEndpoints = (endpoints) => {
    const isDoneCounter = {
        "true": 0,
        "false": 0
    }
    let result = "";
    let endpointCounter = 0;

    endpoints.forEach(async endpoint => {
        const isDone = await getIsDone(endpoint);
        isDoneCounter[`${isDone}`] += 1;
        result += `${endpoint}: isDone=${isDone}\n`;
        endpointCounter++;

        if (endpointCounter === 20) {
            result += `Значений true: ${isDoneCounter["true"]}\nЗначений false: ${isDoneCounter["false"]}`;
            writeResults(result);
        }
    })
}


const writeResults = (result) => {
    fs.writeFile("README.md", result.replaceAll("\n", "<br />"), "utf8", (err) => {
        if (err) throw err;
        console.log("SavedResults")
    });
}


const main = async () => {
    const endpoints = await readEndpoints();
    iterateEndpoints(endpoints);// writeResults(result);
}


main();