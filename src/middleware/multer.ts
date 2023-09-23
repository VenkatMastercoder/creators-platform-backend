import multer from 'multer';
import express from 'express';

const storage = multer.memoryStorage();
const fileFilter = (req: express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    if (file.mimetype.split("/")[1] == "pdf") {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000000, files: 1 } });

export default upload;