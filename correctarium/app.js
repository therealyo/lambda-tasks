const express = require("express");
const calculations = require("./calculations");
const app = express();


app.use(express.json());
const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Waiting for request");
})

app.post("/", (req, res) => {
    console.log(req.body);
    const result = calculations.processRequest(req.body);
    console.log(result);
    res.send(result);
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Sever started at port http://localhost:${PORT}`);
})