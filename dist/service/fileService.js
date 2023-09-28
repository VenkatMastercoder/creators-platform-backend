"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Delete = exports.deleteFileByUrl = exports.s3Uploadv2 = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.S3();
const s3Uploadv2 = async (files) => {
    if (!process.env.AWS_BUCKET_NAME) {
        throw new Error('AWS_BUCKET_NAME is not set.');
    }
    const uploads = files.map(async (file) => {
        const key = `uploads/${(0, uuid_1.v4)()}-${file.originalname}`;
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
        }
        catch (error) {
            return {
                key: key,
                originalname: file.originalname,
                error: "An unknown error occurred"
            };
        }
    });
    return await Promise.all(uploads);
};
exports.s3Uploadv2 = s3Uploadv2;
const deleteFileByUrl = async (fileUrls, fileKeyToDelete) => {
    const updatedFileUrls = fileUrls.filter((fileUrlObject) => {
        return fileUrlObject.key !== fileKeyToDelete;
    });
    console.log("=======");
    console.log("updated:", updatedFileUrls);
    return updatedFileUrls;
};
exports.deleteFileByUrl = deleteFileByUrl;
const s3Delete = async (fileKey, id) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileKey,
    };
    try {
        const fileArray = await prismaClient_1.default.attachment.findUnique({
            where: { id: Number(id) },
        });
        console.log("fileArray:", fileArray);
        console.log("=======");
        console.log("fileKey:", fileKey);
        if (!fileArray) {
            return { success: false, message: 'Attachment not found' };
        }
        const fileUrl = fileArray.fileUrl || [];
        console.log("fileUrl:", fileUrl);
        console.log("=======");
        await s3.headObject(params).promise();
        // If the headObject() call succeeds, the file exists
        await s3.deleteObject(params).promise();
        const updatedFileUrls = await (0, exports.deleteFileByUrl)(fileUrl, fileKey);
        console.log("==>ANS", updatedFileUrls);
        const upadatedArray = await prismaClient_1.default.attachment.update({
            where: { id: Number(id) },
            data: { fileUrl: updatedFileUrls },
        });
        console.log("UpdatedArray", upadatedArray);
        return { success: true, message: 'File deleted successfully' };
    }
    catch (error) {
        return { success: false, message: error };
    }
};
exports.s3Delete = s3Delete;
