"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controller/fileController");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.post("/upload", multer_1.default.array("file"), fileController_1.fileUploadController);
router.delete("/delete", fileController_1.fileDeleteController);
exports.default = router;
