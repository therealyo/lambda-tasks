import { handlerPath } from '../../libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'delete',
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
            Action: ['s3:Delete*'],
            Resource: 'arn:aws:s3:::${self:custom.S3BucketName}/*'
        },
        {
            Effect: 'Allow',
            Action: [
                'dynamodb:Get*',
                "dynamodb:Delete*",
                'dynamodb:Update*',
                'dynamodb:PutItem'
            ],
            Resource: '*'
        }
    ]
};
