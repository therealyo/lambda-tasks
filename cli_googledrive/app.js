const prompt = require("./prompt");
const utils = require("./utils");


const main = async () => {
    const fileToUpload = await prompt.suggestUploadingFile();
    const path = fileToUpload.filepath;

    try {
        let fileName = utils.getFileName(path);
        let format = utils.getFileExtension(fileName);
        console.log(`Name of your file is ${fileName}`);

        const change = await prompt.suggestChangingName();
        if (change.answer) {
            let newName = await prompt.enterNewName();
            fileName = `${newName.updatedName}.${format}`;
        }

        const id = await utils.uploadFile(path, fileName);
        let link = utils.generateLinkToFile(id);

        const shorten = await prompt.suggestShorten();
        if (shorten.shorten) {
            link = await utils.shortenLink(link);
        }

        console.log(`Your url is ${link}`);

    } catch (err) {
        console.log(err);
    }
}


main();

