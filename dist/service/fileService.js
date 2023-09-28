"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Delete = exports.s3Uploadv2 = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
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
const s3Delete = async (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileKey,
    };
    try {
        await s3.headObject(params).promise();
        // If the headObject() call succeeds, the file exists
        const result = await s3.deleteObject(params).promise();
        return { success: true, message: 'File deleted successfully' };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
};
exports.s3Delete = s3Delete;
