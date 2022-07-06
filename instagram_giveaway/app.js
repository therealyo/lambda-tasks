const path = require("path");
const fs = require("fs");


const dataDir = "2kk_words_400x400";


const readDir = async (dirName) => {
    return await fs.promises.readdir(dirName);
}


const getUniqueFromTXT = async (txtPath) => {
    const file = (await fs.promises.readFile(txtPath, {encoding: "utf-8"})).split("\n");
    return new Set(file);

}


const getUniqueAll = async (dir) => {
    const uniqueAll = new Set();
    const dirIterator = await readDir(dir);

    for await (const file of dirIterator) {
        const txtPath = path.join(dir, file);
        const uniqueTXT = await getUniqueFromTXT(txtPath);
        uniqueTXT.forEach(uniqueAll.add, uniqueAll);

    }
    return uniqueAll
}


const createEmptyMap = async (unique) => {
    const map = new Map();
    for (const el of unique) {
        map.set(el, 0);
    }
    return map;
}


const countOccurrence = async (unique, dir) => {
    const dirIterator = await readDir(dir);
    const occurrence = await createEmptyMap(unique);

    for await (const file of dirIterator) {
        const txtPath = path.join(dir, file);
        const uniqueInFile = await getUniqueFromTXT(txtPath);

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


const writeResults = (results) => {
    fs.writeFile("results.md", results, "utf8", (err) => {
        if (err) throw err;
        console.log("SavedResults")
    });
}

const createResultsString = async () => {
    const start = new Date();

    const unique = await getUniqueAll(dataDir);
    const occurrence = await countOccurrence(unique, dataDir);
    const appearedIn20 = await getAllAppearedIn20(occurrence, dataDir)
    const appearedIn10More = await getAllAppearedIn10More(occurrence, dataDir)

    const used = (new Date() - start) / 1000;

    return `Unique values in data directory: ${unique.size}\nAppeared in 20 files: ${appearedIn20}\nAppeared in 10+ files: ${appearedIn10More}\nTime used: ${used}s`

}

const main = async () => {
    const results = await createResultsString();
    console.log(results);
    writeResults(results);
}


main();
