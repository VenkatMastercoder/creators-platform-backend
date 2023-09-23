import express, {Router} from 'express';
import { fileUploadController, fileDeleteController } from '../controller/fileController';
import upload from '../middleware/multer';

const router: Router = express.Router();

router.post("/upload", upload.array("file"), fileUploadController);

router.delete("/delete", fileDeleteController);

export default router;