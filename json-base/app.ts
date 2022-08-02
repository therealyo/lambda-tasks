import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
    servePostRequest,
    serveGetRequest,
} from "./controllers/UserController";

dotenv.config();

const app: Express = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const mongoPath = `mongodb+srv://therealyo:${process.env.PASSWORD}@cluster0.sgzob.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoPath, () => {
    console.log("Connected to database");
});

app.get("/", (req: Request, res: Response) => {
    res.send("Add your personal route");
});

app.get("/:path", serveGetRequest);
app.post("/:path", servePostRequest);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
