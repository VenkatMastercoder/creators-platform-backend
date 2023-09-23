import dotenv from "dotenv";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid"; 

dotenv.config();
const s3 = new S3();

export const s3Uploadv2 = async() => {

}

export const s3Delete = async (fileKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || '', 
        Key: fileKey,
    };

    const result = await s3.deleteObject(params).promise();
    return result;
};