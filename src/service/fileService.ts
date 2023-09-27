import dotenv from "dotenv";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid"; 

dotenv.config();
const s3 = new S3();

export const s3Uploadv2 = async (files: Express.Multer.File[]) => {

    const imageExt = ["png", "jpg", "jpeg"]

    const params = files.map(file => {

        if (imageExt.includes(file.mimetype.split('/')[1])) {
            return {
                Bucket: process.env.AWS_BUCKET_NAME || '',
                Key: `images/${uuid()}-${file.originalname}`,
                Body: file.buffer
            };
        } else {
            return {
                Bucket: process.env.AWS_BUCKET_NAME || '',
                Key: `uploads/${uuid()}-${file.originalname}`,
                Body: file.buffer
            };
        }
    });

    const uploadResults = await Promise.all(params.map(param => s3.upload(param).promise()));

    const results = uploadResults.map((result, index) => {
        return { ...result, originalname: files[index].originalname };
    });

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
