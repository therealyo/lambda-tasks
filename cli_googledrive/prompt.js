const inquirer = require("inquirer");


const suggestChangingName = async () => {
    return await inquirer.prompt([
        {
            name: "answer",
            type: "confirm",
            message: "Would you like to change name of the file?(Enter name) "
        }
    ])
}

const enterNewName = async () => {
    return await inquirer.prompt([
        {
            name: "updatedName",
            type: "input",
            message: "Enter new file name: "
        }
    ])
}

const suggestShorten = async () => {
    return await inquirer.prompt([
        {
            name: "shorten",
            type: "confirm",
            message: "Do you want to shorten your link?"
        }
    ])
}


const suggestUploadingFile = async () => {
    return await inquirer.prompt([
        {
            name: "filepath",
            type: "input",
            message: "Enter path to file or simply drag and drop it to the console: "
        }
    ])
}


module.exports = {
    suggestChangingName,
    enterNewName,
    suggestShorten,
    suggestUploadingFile
}