import express, { Router } from "express";
import { getAllDigitProdController } from "../controller/prodController";

const router: Router = express.Router();

router.get("/", getAllDigitProdController);

export default router;