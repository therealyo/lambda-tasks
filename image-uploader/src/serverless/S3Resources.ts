import type { AWS } from "@serverless/typescript";

export const S3Resources: AWS["resources"]["Resources"] = {
    UserDataStorage: {
        Type: "AWS::S3::Bucket",
        Properties: {
            BucketName: "${self:custom.S3BucketName}",
            AccessControl: "Private"
        }
    }
    
}