import { handlerPath } from '../../libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'upload',
                authorizer: {
                    type: 'COGNITO_USER_POOLS',
                    authorizerId: {
                        Ref: 'ApiAuthorizer'
                    }
                },
            }
        }
    ],
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['s3:Put*'],
            Resource: 'arn:aws:s3:::${self:custom.S3BucketName}/*'
        },
        {
            Effect: 'Allow',
            Action: [
                'dynamodb:Get*',
                'dynamodb:Update*',
                'dynamodb:PutItem'
            ],
            Resource: '*'
        }
    ]
};
