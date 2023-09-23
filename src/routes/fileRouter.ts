import express, {Router} from 'express';
import { fileUploadController, fileDeleteController } from '../controller/fileController';

const router: Router = express.Router();

router.post("/upload", fileUploadController);

router.delete("/delete", fileDeleteController);

export default router;