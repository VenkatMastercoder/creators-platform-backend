"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterError = void 0;
const multer_1 = require("multer");
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer_1.MulterError) {
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
exports.handleMulterError = handleMulterError;
