import { Request, Response } from 'express';
import { makeAPIDataWritableToDB } from '../utils/array_utils';
import { getFilteredAPIsData } from '../utils/retrieve_api';

export const processRequest = async (req: Request, res: Response) => {
    const data = await getFilteredAPIsData();
    console.log(makeAPIDataWritableToDB(data));
    res.json(data);
};
