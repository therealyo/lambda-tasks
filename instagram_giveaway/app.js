const result = require("./result_utils");


const dataDir = "2kk_words_400x400";


const main = async () => {
    const results = await result.createResultsString(dataDir);
    console.log(results);
    result.writeResults(results);
}


main();
