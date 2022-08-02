import { Request, Response } from "express";
import {
    getRouteData,
    createRouteData,
    updateRouteDate,
} from "../utils/database";

export const serveGetRequest = async (req: Request, res: Response) => {
    try {
        const userData = await getRouteData(req.params.path);
        if (userData) {
            const response = JSON.parse(userData.stored!);
            res.status(200).json(response);
        } else {
            res.status(404).send("Route does not exist");
        }
        
    } catch (err) {
        console.error(err);
        res.send(500).send("Error Occurred");
    }
};

export const servePostRequest = async (req: Request, res: Response) => {
    try {
        if (!(await getRouteData(req.params.path))) {
            await createRouteData(req.params.path, req.body);
        } else {
            await updateRouteDate(req.params.path, req.body);
        }
        res.status(200).send(`Successfully added data to ${req.params.path}`);
    } catch (err) {
        console.error(err);
        res.send(500).send("Error Occurred");
    }
};
