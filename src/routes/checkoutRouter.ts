import express, {Router} from 'express';
import { sendEmailController } from '../controller/checkoutController';

const router: Router = express.Router();

router.post("/send", sendEmailController);

export default router;