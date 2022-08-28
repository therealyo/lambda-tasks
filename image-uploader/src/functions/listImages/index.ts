import { handlerPath } from '../../libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.handler`,
    events: [
        {
            http: {
                method: 'get',
                path: 'listImages',
                authorizer: {
                    type: 'COGNITO_USER_POOLS',
                    authorizerId: {
                        Ref: 'ApiAuthorizer'
                    }
                }
            }
        }
    ],
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:Scan*'],
            Resource: '*'
        }
    ]
};
