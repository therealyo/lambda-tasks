const result = require("./utils/result");


const dataDir = "data/2kk_words";


const main = async () => {
    const results = await result.createResultsString(dataDir);
    console.log(results);
    result.writeResults(results);
}


main();
