import multer from 'multer';
import express from 'express';

const fileFilter = (req: express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {

    const allowedExt = ["pdf", "zip"]

    if (allowedExt.includes(file.mimetype.split('/')[1])) {
        callback(null, true);
    } else {
        const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
        callback(error);
    }
};

const upload = multer({ fileFilter, limits: { fileSize: 100000000, files: 1 } });

export default upload;