const path = require("path");
const fs = require("fs");




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


module.exports = {
    readDir,
    getUniqueFromTXT,
    getUniqueAll
}