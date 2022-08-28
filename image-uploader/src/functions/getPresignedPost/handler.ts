import { S3 } from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import { Response } from "../../@types/response";
import schema from './schema';

export const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: { message: ""}
    };
    try {
        const s3 = new S3();
        const { filename: key } = event.pathParameters;
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${key}.jpg`,
            Expires: 300,
            ACL: 'public-read'
        };
        const url = await s3.getSignedUrlPromise("putObject", params);
        response.body.message = url;
    } catch (err) {
        response.statusCode = 400;
        response.body.message = err.message;
    }
    return formatJSONResponse(response);
};

