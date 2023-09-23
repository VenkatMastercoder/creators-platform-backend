import { MulterError } from 'multer';
import express, { Request, Response, NextFunction } from 'express';

const app = express()
app.use(express.json())

// Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                message: "File is too large"
            })
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(422).json({
                message: "File limit reached"
            })
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(422).json({
                message: "Invalid Field Type"
            })
        }
    }
    next(error); // Important to call next() to ensure that other middlewares or error handlers can also handle the error.
})