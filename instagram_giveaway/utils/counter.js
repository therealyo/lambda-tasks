const path = require("path");
const reader = require("./reader");



const createEmptyMap = async (unique) => {
    const map = new Map();
    for (const el of unique) {
        map.set(el, 0);
    }
    return map;
}


const countOccurrence = async (unique, dir) => {
    const dirIterator = await reader.readDir(dir);
    const occurrence = await createEmptyMap(unique);

    for await (const file of dirIterator) {
        const txtPath = path.join(dir, file);
        const uniqueInFile = await reader.getUniqueFromTXT(txtPath);

        for (const el of uniqueInFile) {
            occurrence.set(el, occurrence.get(el) + 1);
        }
    }
    return occurrence;
}


const getAllAppearedInN = async (occurrence, dir, N) => {
    let counter = 0;

    for (const val of occurrence.values()) {
        if (val >= N) {
            counter++;
        }
    }

    return counter;
}


const getAllAppearedIn20 = async (occurrence, dir) => {
    return await getAllAppearedInN(occurrence, dir, 20);
}


const getAllAppearedIn10More = async (occurrence, dir) => {
    return await getAllAppearedInN(occurrence, dir, 10);
}


module.exports = {
    countOccurrence,
    getAllAppearedIn20,
    getAllAppearedIn10More
}