const fs = require("fs");
const path = require('path');
const {google} = require('googleapis');
const tinyurl = require("tinyurl");

const FOLDER = "1Gk216NtNyog179quqNKKPwqyI3bwHDIs";

const getFileName = (path) => {
    return path.split("\\")
        .at(-1);
}

const getFileExtension = (fileName) => {
    return fileName.split(".")
        .at(-1);
}

const generateLinkToFile = (id) => {
    return `https://drive.google.com/open?id=${id}`;
}

const shortenLink = async (link) => {
    return await tinyurl.shorten(link);
}

const getDriveService = () => {
    const KEYFILEPATH = path.join(__dirname, 'credentials.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    return google.drive({version: 'v3', auth});
};

const uploadFile = async (path, fileName) => {
    const driveServices = getDriveService();

    const {data: {id, name} = {}} = await driveServices.files.create({
        resource: {
            name: fileName,
            parents: [FOLDER],
        },
        media: {
            mimeType: `image/${getFileExtension(fileName)}`,
            body: fs.createReadStream(path),
        },
        fields: 'id,name',
    });

    console.log('File Uploaded', name);
    return id;
}




module.exports = {
    getFileName,
    getFileExtension,
    getDriveService,
    generateLinkToFile,
    shortenLink,
    uploadFile
}