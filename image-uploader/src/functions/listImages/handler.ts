import AWS from 'aws-sdk';
import { Response } from '../../@types/response';
import {
    formatJSONResponse,
    ValidatedEventAPIGatewayProxyEvent
} from '../../libs/api-gateway';
import { retrieveAuthData } from '../../libs/utils';

const listDataFromDB = async (email: string) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
        region: process.env.REGION
    });
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        FilterExpression: 'email = :em',
        ExpressionAttributeValues: {
            ':em': email
        }
    };
    return await dynamodb.scan(params).promise();
};

export const handler = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: {
            message: ''
        }
    };
    try {
        const { email } = retrieveAuthData(event);

        const { Items: userData } = await listDataFromDB(email);
        response.body.message = userData.map((el) => { return el.key });
        
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.body.message = err.message;
    }

    return formatJSONResponse(response);
};
