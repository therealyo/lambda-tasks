require('dotenv').config();
const express = require('express');
const ipUtils = require("./ip_utils")
const app = express();


const PORT = process.env.PORT || 3000;
app.set('trust proxy', true);



app.get("/", async (req, res) => {
    const response = await ipUtils.createResponse(req.ip);
    console.log(response);

    res.send(response);
})


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server started");
});