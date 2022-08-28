import type { AWS } from '@serverless/typescript';

import { DynamoResources } from './src/serverless/DynamoResources';
import { S3Resources } from './src/serverless/S3Resources';
import { CognitoResources } from './src/serverless/CognitoResources';
import uploadImage from './src/functions/uploadImage';
import listImages from './src/functions/listImages';
import deleteImage from './src/functions/deleteImage';
import getPresignedPost  from './src/functions/getPresignedPost';
import signin from "./src/functions/signin";
import signup from "./src/functions/signup";

const serverlessConfiguration: AWS = {
    service: 'image-uploader',
    frameworkVersion: '3',
    plugins: [
        'serverless-offline',
        'serverless-iam-roles-per-function',
        'serverless-dotenv-plugin',
        'serverless-esbuild'
    ],
    provider: {
        name: 'aws',
        profile: 'typescript-imageUploader',
        runtime: 'nodejs16.x',
        region: 'eu-west-2',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            DYNAMODB_TABLE_NAME: '${self:custom.userTableName}',
            S3_BUCKET: '${self:custom.S3BucketName}',
            S3_BUCKET_LINK: "https://therealyo-image-uploader-bucket.s3.eu-west-2.amazonaws.com/",
            COGNITO_POOL: '${self:custom.cognitoPoolName}',
            COGNITO_POOL_ID: {
                Ref: "CognitoUsersPool"
            },
            COGNITO_CLIENT: '${self:custom.cognitoClientName}',
            COGNITO_CLIENT_ID: {
                Ref: "CognitoUsersClient"
            },
            REGION: '${self:provider.region}'
        }
    },
    functions: {
        signup,
        signin,
        getPresignedPost,
        uploadImage,
        listImages,
        deleteImage
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            target: "node16"
        },
        userTableName: 'therealyo--${self:service}-dynamodb',
        S3BucketName: 'therealyo-${self:service}-bucket',
        cognitoPoolName: 'therealyo-${self:service}-cognito',
        cognitoClientName: 'therealyo-${self:service}-client',
        apigateway: "image-uploader-dev"
    },
    resources: {
        Resources: {
            ...DynamoResources,
            ...S3Resources,
            ...CognitoResources
        }
    }
};

module.exports = serverlessConfiguration;
