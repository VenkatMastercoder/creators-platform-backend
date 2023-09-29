import express, {Router} from 'express';
import { sendEmailController } from '../controller/emailController';

const router: Router = express.Router();

router.post("/send", sendEmailController);

export default router;