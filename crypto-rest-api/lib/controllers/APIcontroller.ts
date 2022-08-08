import { RequestHandler } from 'express';
import { Params, ReqBody, ReqQuery, ResBody } from '../config/types';
import { generateQueryString, getCoinDataFromQuery } from '../db/database';

export const processRequest: RequestHandler<
    Params,
    ResBody,
    ReqBody,
    ReqQuery
> = async (req, res) => {
    // console.log(req.query.crypto);
    // console.log(req.query.market);
    const queryString = generateQueryString(
        req.query.crypto?.split(","),
        req.query.market,
        req.query.startDate,
        req.query.endDate
    );
    try {
        const data = (await getCoinDataFromQuery(queryString))[0];
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(queryString)
    }
};
