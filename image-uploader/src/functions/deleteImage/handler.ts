import AWS from 'aws-sdk';
import { Response } from '../../@types/response';
import {
    formatJSONResponse,
    ValidatedEventAPIGatewayProxyEvent
} from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { retrieveAuthData } from '../../libs/utils';
import schema from './schema';

const deleteFromDB = async (email: string, key: string) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            email: email,
            key: `${process.env.S3_BUCKET_LINK}images/${key}.jpg`
        }
    }

    await dynamodb.delete(params).promise();
};

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: {
            message: ''
        }
    };

    try {
        const { key } = event.body;
        console.log(key);
        const s3 = new AWS.S3();
        var params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${key}.jpg`
        };
        const { email } = retrieveAuthData(event);

        await deleteFromDB(email, key);
        await s3.deleteObject(params).promise();
        response.body.message = `Successfully deleted ${key}`
        
    } catch (err) {
        response.body.message = err.message;
        response.statusCode = 500;
    }

    return formatJSONResponse(response);
};

export const main = middyfy(handler, schema);
