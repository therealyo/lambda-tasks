import express, { Express, Request, Response } from 'express';
import {
    convertCoinObjectToArray,
    flatArray,
    makeAPIDataWritableToDB
} from './utils/array_utils';
import { retrieveAllApisData } from './utils/retrieve_api';

const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    const test = await retrieveAllApisData();
    // console.log(test);
    const writable = makeAPIDataWritableToDB(test);
    console.log(writable);
    // console.log(flatTest);
    res.send('good');
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
