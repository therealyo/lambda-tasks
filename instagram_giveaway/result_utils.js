const fs = require("fs");
const reader = require("./reader_utils");
const counter = require("./counter_utils");

const writeResults = (results) => {
    fs.writeFile("README.md", results.replaceAll("\n", "<br />"), "utf8", (err) => {
        if (err) throw err;
        console.log("SavedResults")
    });
}

const createResultsString = async (dir) => {
    const start = new Date();

    const unique = await reader.getUniqueAll(dir);
    const occurrence = await counter.countOccurrence(unique, dir);
    const appearedIn20 = await counter.getAllAppearedIn20(occurrence, dir)
    const appearedIn10More = await counter.getAllAppearedIn10More(occurrence, dir)

    const used = (new Date() - start) / 1000;

    return `Unique values in data directory: ${unique.size}\nAppeared in 20 files: ${appearedIn20}\nAppeared in 10+ files: ${appearedIn10More}\nTime used: ${used}s`

}

module.exports = {
    createResultsString,
    writeResults
}