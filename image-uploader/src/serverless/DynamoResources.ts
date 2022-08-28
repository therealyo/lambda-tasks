import type { AWS } from '@serverless/typescript';

export const DynamoResources: AWS['resources']['Resources'] = {
    UserDataTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.userTableName}',
            AttributeDefinitions: [
                {
                    AttributeName: 'email',
                    AttributeType: 'S'
                },
                {
                    AttributeName: 'key',
                    AttributeType: 'S'
                }
            ],
            KeySchema: [
                {
                    AttributeName: 'email',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'key',
                    KeyType: 'RANGE'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    }
};
