import AWS from 'aws-sdk';
import { Response } from '../../@types/response';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: { message: '' }
    };
    try {
        const identityService = new AWS.CognitoIdentityServiceProvider();
        const { email, password } = event.body;

        await identityService
            .signUp({
                Username: email,
                Password: password,
                ClientId: process.env.COGNITO_CLIENT_ID!
            })
            .promise();

        response.body = {
            message: `Successfully added user ${email}. Check your email for verification.`
        };
    } catch (err) {
        response.statusCode = 400;
        response.body.message = err.message;
    }
    return formatJSONResponse(response);
};

export const main = middyfy(handler, schema);
