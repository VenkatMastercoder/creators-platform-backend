import dotenv from "dotenv";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

dotenv.config();

const s3 = new S3();

export const s3Uploadv2 = async (files: Express.Multer.File[]): Promise<{ url?: string, key: string, originalname: string, error?: string }[]> => {
    if (!process.env.AWS_BUCKET_NAME) {
        throw new Error('AWS_BUCKET_NAME is not set.');
    }

    const uploads = files.map(async file => {
        const key = `uploads/${uuid()}-${file.originalname}`;

        if (!process.env.AWS_BUCKET_NAME) {
            return {
                key: key,
                originalname: file.originalname,
                error: 'AWS_BUCKET_NAME is not set.'
            };
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer
        };

        try {
            const uploadResult = await s3.upload(params).promise();
            return {
                url: uploadResult.Location,
                key: key,
                originalname: file.originalname
            };
        } catch (error) {
            return {
                key: key,
                originalname: file.originalname,
                error: "An unknown error occurred"
            };
        }
    });

    return await Promise.all(uploads);
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

        return { success: true, message: 'File deleted successfully' };

    } catch (error: any) {

        return { success: false, message: error.message };
    }
};
