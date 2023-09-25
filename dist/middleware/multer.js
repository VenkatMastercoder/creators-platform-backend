"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, callback) => {
    if (file.mimetype.split("/")[1] == "pdf") {
        callback(null, true);
    }
    else {
        const error = new multer_1.default.MulterError('LIMIT_UNEXPECTED_FILE');
        callback(error);
    }
};
const upload = (0, multer_1.default)({ fileFilter, limits: { fileSize: 1000, files: 1 } });
exports.default = upload;
