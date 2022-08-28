import AWS from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { Response } from "../../@types/response";
// import { v4 as uuidv4 } from 'uuid';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    const response: Response = {
        statusCode: 200,
        body: {
            message: ""
        }
    };
    try {
        const { email, password } = event.body;
        const identityService = new AWS.CognitoIdentityServiceProvider()
        const res = await identityService.initiateAuth({
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            },
            ClientId: process.env.COGNITO_CLIENT_ID
        }).promise();
        response.body.message = { ...res };
    } catch (err) {
        response.statusCode = 400;
        response.body.message = err.message;
    }
    return formatJSONResponse(response);
};

export const main = middyfy(handler, schema);
