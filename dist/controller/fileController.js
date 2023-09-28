"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDeleteController = exports.fileUploadController = void 0;
const fileService_1 = require("../service/fileService");
const fileUploadController = async (req, res) => {
    try {
        const results = await (0, fileService_1.s3Uploadv2)(req.files);
        res.status(200).json({ status: "success", message: results });
    }
    catch (err) {
        res.status(500).json({ status: "error occurred", message: err.message });
    }
};
exports.fileUploadController = fileUploadController;
const fileDeleteController = async (req, res) => {
    const fileKey = req.headers["filekey"];
    const id = req.headers["id"];
    console.log("id:", id);
    console.log("fileKey:", fileKey);
    try {
        const result = await (0, fileService_1.s3Delete)(fileKey, id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ status: "error occurred", message: err.message });
    }
};
exports.fileDeleteController = fileDeleteController;
