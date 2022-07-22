const express = require('express');
const ipUtils = require("./ip_utils")
const app = express();


const PORT = 3000;
app.set('trust proxy', true);



app.get("/", async (req, res) => {
    const response = await ipUtils.createResponse(req.ip);
    console.log(response);

    res.setHeader('Content-Type', 'application/json');
    res.send(response);
})


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server started at port ${PORT}`);
});