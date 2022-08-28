import axios from 'axios';
import AWS from 'aws-sdk';

import { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';
import { retrieveAuthData } from '../../libs/utils';
import { Response } from '../../@types/response';

const saveToDB = async (email: string, key: string) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
        region: process.env.REGION
    });
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
            email: email,
            key: `${process.env.S3_BUCKET_LINK}images/${key}.jpg`
        }
    };
    await dynamodb.put(params).promise();
};

const uploadImage: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: {
            message: ''
        }
    };
    try {
        const { key, image: imageBase64 } = event.body;
        const decodedImage = Buffer.from(imageBase64, 'base64');
        const {
            data: { message: url }
        } = await axios.get(
            `https://r9sadwozpc.execute-api.eu-west-2.amazonaws.com/dev/getPresignedPost/${key}`,
            {
                headers: {
                    Authorization: event.headers.Authorization
                }
            }
        );
        await axios.put(url, decodedImage);

        const { email } = retrieveAuthData(event);
        await saveToDB(email, key);

        response.body.message = `Successfully added image ${key}.jpg`;
    } catch (err) {
        console.error(err);
        response.body.message = err.message;
        response.statusCode = 500;
    }

    return formatJSONResponse(response);
};

export const main = middyfy(uploadImage, schema);