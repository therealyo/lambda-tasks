import type { AWS } from '@serverless/typescript';

export const CognitoResources: AWS['resources']['Resources'] = {
    CognitoUsersPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
            UserPoolName: '${self:custom.cognitoPoolName}',
            AutoVerifiedAttributes: ['email'],
            Policies: {
                PasswordPolicy: {
                    MinimumLength: 8,
                    RequireUppercase: true
                }
            },
            UsernameAttributes: ['email'],
            VerificationMessageTemplate: {
                DefaultEmailOption: "CONFIRM_WITH_LINK"
            }
        }
    },
    CognitoUsersClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
            ClientName: '${self:custom.cognitoClientName}',
            UserPoolId: {
                Ref: 'CognitoUsersPool'
            },
            GenerateSecret: false,
            ExplicitAuthFlows: [
                'ALLOW_USER_PASSWORD_AUTH',
                'ALLOW_REFRESH_TOKEN_AUTH'
            ],
            PreventUserExistenceErrors: 'ENABLED',
            SupportedIdentityProviders: ['COGNITO']
        }
    },
    ApiAuthorizer: {
        DependsOn: ['ApiGatewayRestApi'],
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
            Name: 'Authorizer-${self:provider.profile}',
            Type: 'COGNITO_USER_POOLS',
            RestApiId: {
                Ref: 'ApiGatewayRestApi'
            },
            ProviderARNs: [{ 'Fn::GetAtt': ['CognitoUsersPool', 'Arn'] }],
            IdentitySource: 'method.request.header.Authorization'
        }
    }
};
