import dotenv from "dotenv";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid"; 
import { Multer } from "multer";

dotenv.config();
const s3 = new S3();

export const s3Uploadv2 = async (files: Express.Multer.File[]) => {
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer 
        };
    });

    const results = await Promise.all(params.map(param => s3.upload(param).promise()));
    return results;
};


export const s3Delete = async (fileKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || '', 
        Key: fileKey,
    };

    try {
        await s3.headObject(params).promise();

        // If the headObject() call succeeds, the file exists
        const result = await s3.deleteObject(params).promise();

        return { success: true, message: 'Object deleted successfully' };

    } catch (error: any) {
        
        return { success: false, message: error.message };
    }
};
