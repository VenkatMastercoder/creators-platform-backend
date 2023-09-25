import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';

export const handleMulterError = (error: Error | MulterError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                message: "File is too large"
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(422).json({
                message: "File limit reached"
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(422).json({
                message: "Invalid Field Type"
            });
        }
    }

    next(error);
};
