import { RequestHandler } from 'express';
import { Params, ReqBody, ReqQuery, ResBody } from '../config/types';
import { generateQueryString, getCoinDataFromQuery } from '../db/database';

export const processRequest: RequestHandler<
    Params,
    ResBody,
    ReqBody,
    ReqQuery
> = async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        const queryString = generateQueryString(
            req.query.crypto?.split(','),
            req.query.market,
            req.query.startDate,
            req.query.endDate
        );
        if (queryString.includes("SELECT")) {
            const data = (await getCoinDataFromQuery(queryString));
            res.status(200).json(data);
        } else {
            res.status(400).send(queryString);
        }
    } else {
        res.status(200).send('Add query params to process request');
    }
};
